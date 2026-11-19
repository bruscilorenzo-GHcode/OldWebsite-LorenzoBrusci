import Link from "next/link";
import ReactMarkdown from "react-markdown";

/** Markdown with working internal links (next/link), external links in a new tab. */
export function Prose({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`prose-living space-y-5 ${className}`}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="prose-editorial">{children}</p>,
          ul: ({ children }) => <ul className="list-none space-y-3 border-t border-line pt-4">{children}</ul>,
          li: ({ children }) => (
            <li className="border-b border-line pb-3 text-ink-2 leading-relaxed">{children}</li>
          ),
          h1: ({ children }) => <h2 className="display-sm mt-8">{children}</h2>,
          h2: ({ children }) => <h2 className="display-sm mt-8">{children}</h2>,
          h3: ({ children }) => <h3 className="font-grotesk text-xl font-bold tracking-[-0.03em] mt-6">{children}</h3>,
          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-highlight pl-4 text-ink-2">{children}</blockquote>
          ),
          a: ({ href = "", children }) => {
            if (href.startsWith("/")) return <Link href={href} className="link-arrow">{children}</Link>;
            if (href.startsWith("#")) return <a href={href} className="link-arrow">{children}</a>;
            return (
              <a href={href} className="link-arrow" target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener">
                {children}
              </a>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
