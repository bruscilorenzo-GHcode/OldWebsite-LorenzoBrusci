export function EditorialText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((block) => block.replace(/\s*\n\s*/g, " ").replace(/[ \t]+/g, " ").trim())
    .filter(Boolean);

  return (
    <div className={`prose-editorial ${className}`}>
      {blocks.map((block, index) => (
        <p key={index}>{block}</p>
      ))}
    </div>
  );
}
