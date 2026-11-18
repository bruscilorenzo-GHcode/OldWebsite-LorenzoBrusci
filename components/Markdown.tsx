import React from "react";

function inline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={index}
          className="border border-line bg-surface px-1 py-0.5 font-code text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export function InlineText({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let quote: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    nodes.push(
      <p key={key++} className="text-ink-2">
        {inline(paragraph.join(" "))}
      </p>,
    );
    paragraph = [];
  };
  const flushList = () => {
    if (!list.length) return;
    nodes.push(
      <ul key={key++} className="list-disc space-y-1 pl-5 text-ink-2">
        {list.map((item, index) => (
          <li key={index}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  const flushQuote = () => {
    if (!quote.length) return;
    nodes.push(
      <blockquote
        key={key++}
        className="border-l-2 border-highlight pl-4 text-ink-2"
      >
        {inline(quote.join(" "))}
      </blockquote>,
    );
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushAll();
      continue;
    }
    if (line.startsWith("### ")) {
      flushAll();
      nodes.push(
        <h3 key={key++} className="mt-8 font-grotesk text-lg font-bold tracking-[-0.02em]">
          {inline(line.slice(4))}
        </h3>,
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushAll();
      nodes.push(
        <h2 key={key++} className="mt-10 font-grotesk text-2xl font-bold tracking-[-0.03em]">
          {inline(line.slice(3))}
        </h2>,
      );
      continue;
    }
    if (line.startsWith("# ")) {
      flushAll();
      nodes.push(
        <h2 key={key++} className="font-grotesk text-3xl font-bold tracking-[-0.04em]">
          {inline(line.slice(2))}
        </h2>,
      );
      continue;
    }
    if (line.startsWith("---")) {
      flushAll();
      nodes.push(<hr key={key++} className="my-6 border-line" />);
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      flushQuote();
      list.push(line.slice(2));
      continue;
    }
    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      quote.push(line.slice(2));
      continue;
    }
    flushList();
    flushQuote();
    paragraph.push(line);
  }

  flushAll();

  return <div className="space-y-4 text-sm leading-relaxed">{nodes}</div>;
}
