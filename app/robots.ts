import type { MetadataRoute } from "next";

const automatedAgents = [
  "GPTBot",
  "CCBot",
  "Google-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "Bytespider",
  "PerplexityBot",
  "Applebot-Extended",
  "meta-externalagent",
  "Amazonbot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dataset.json", "/dataset.csv", "/audio/"],
      },
      ...automatedAgents.map((agent) => ({
        userAgent: agent,
        allow: ["/open-database/licence", "/open-database/licence/full"],
        disallow: ["/dataset.json", "/dataset.csv", "/audio/", "/open-database"],
      })),
    ],
    sitemap: "https://www.timet.org/sitemap.xml",
    host: "https://www.timet.org",
  };
}
