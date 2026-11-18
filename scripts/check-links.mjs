import { chromium } from "playwright";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
const ORIGIN = new URL(BASE).origin;
const MAX_PAGES = 80;

const internal = new Map();
const external = new Map();
const assets = new Map();
const visited = new Set();
const queue = ["/"];
const externalLinks = new Set();
const assetUrls = new Set();

const browser = await chromium.launch({ channel: "chrome" });
const context = await browser.newContext();
const page = await context.newPage();

try {
  const health = await context.request.get(`${BASE}/`, { timeout: 15000 });
  if (health.status() !== 200) {
    console.error(`Server at ${BASE} returned ${health.status()}. Start it with: npm run start`);
    await browser.close();
    process.exit(1);
  }
} catch {
  console.error(`Server at ${BASE} is not reachable. Start it with: npm run start`);
  await browser.close();
  process.exit(1);
}

async function checkAsset(url) {
  if (assets.has(url)) return;
  try {
    const response = await context.request.get(url, { timeout: 30000 });
    assets.set(url, response.status());
  } catch {
    assets.set(url, "ERR");
  }
}

async function checkExternal(url) {
  if (external.has(url)) return;
  try {
    const response = await context.request.get(url, {
      timeout: 20000,
      maxRedirects: 5,
    });
    external.set(url, response.status());
  } catch {
    external.set(url, "ERR");
  }
}

while (queue.length > 0 && internal.size < MAX_PAGES) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);

  try {
    const response = await page.goto(`${BASE}${path}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(path === "/open-database" ? 1500 : 350);
    const status = response?.status() ?? 0;
    internal.set(path, status);

    if (status === 200) {
      const hrefs = await page.$$eval("a[href]", (anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")),
      );
      for (const href of hrefs) {
        if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) {
          continue;
        }
        const url = new URL(href, `${BASE}${path}`);
        if (url.origin === ORIGIN) {
          const next = url.pathname + url.search;
          if (!visited.has(next)) queue.push(next);
        } else {
          externalLinks.add(url.href);
        }
      }

      const srcs = await page.$$eval("img[src]", (images) =>
        images.map((image) => image.getAttribute("src")),
      );
      for (const src of srcs) {
        if (src) assetUrls.add(new URL(src, `${BASE}${path}`).href);
      }
    }
  } catch {
    internal.set(path, "ERR");
  }
}

for (const url of assetUrls) await checkAsset(url);
for (const url of externalLinks) await checkExternal(url);

const legacyPaths = [
  "/index.asp",
  "/index.html",
  "/contacts.htm",
  "/licenses.htm",
  "/about/aboutlb.htm",
  "/downloads/cicli.htm",
  "/modular/02.htm",
  "/events/hic.htm",
  "/database/index.asp",
  "/guest/ab/index.htm",
];
const legacy = new Map();
for (const path of legacyPaths) {
  try {
    const response = await context.request.get(`${BASE}${path}`, {
      maxRedirects: 0,
      timeout: 20000,
    });
    const location = response.headers()["location"] ?? "";
    legacy.set(path, { status: response.status(), location });
  } catch {
    legacy.set(path, { status: "ERR", location: "" });
  }
}

await browser.close();

function report(title, map) {
  console.log(`\n${title}`);
  for (const [key, value] of map) {
    const status = typeof value === "string" ? value : value.status;
    const detail =
      typeof value === "string" || !value.location ? "" : ` -> ${value.location}`;
    console.log(`  ${String(status).padEnd(4)} ${key}${detail}`);
  }
}

const internalFailures = [...internal].filter(([, status]) => status !== 200);
const assetFailures = [...assets].filter(([, status]) => status !== 200);
const externalFailures = [...external].filter(([, status]) => status !== 200);
const legacyFailures = [...legacy].filter(
  ([, value]) => value.status !== 308 || !value.location,
);

console.log(`Base URL: ${BASE}`);
console.log(`Pages checked: ${internal.size}`);
console.log(`Assets checked: ${assets.size}`);
console.log(`External links checked: ${external.size}`);
console.log(`Internal failures: ${internalFailures.length}`);
console.log(`Asset failures: ${assetFailures.length}`);
console.log(`External failures: ${externalFailures.length}`);
console.log(`Legacy redirect failures: ${legacyFailures.length}`);

if (internalFailures.length) report("Internal pages that failed", new Map(internalFailures));
if (assetFailures.length) report("Assets that failed", new Map(assetFailures));
if (externalFailures.length) report("External links that failed", new Map(externalFailures));
if (legacyFailures.length) report("Legacy redirects that failed", new Map(legacyFailures));

report("Legacy redirects", legacy);

if (internalFailures.length || assetFailures.length || legacyFailures.length) {
  process.exitCode = 1;
}
