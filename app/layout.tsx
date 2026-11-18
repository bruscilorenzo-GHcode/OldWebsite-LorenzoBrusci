import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://timet.org"),
  title: {
    default: "Timet — nonlinear music and sound architecture",
    template: "%s · Timet",
  },
  description:
    "Timet, Italian sound-art collective founded by Lorenzo Brusci in 1993. Compositions, sound architecture, projects and the open sound database.",
  openGraph: {
    type: "website",
    siteName: "Timet",
    title: "Timet — nonlinear music and sound architecture",
    description:
      "Italian sound-art collective, 1993–2003. Archive, releases, projects and the open sound database.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timet",
    description: "Nonlinear music and sound architecture, 1993–2003.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-line-strong focus:bg-surface focus:px-4 focus:py-3 focus:font-code focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
