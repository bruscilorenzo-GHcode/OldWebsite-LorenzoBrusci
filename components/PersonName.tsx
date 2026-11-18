import { displayName, personUrl } from "@/lib/content";

export function PersonName({ name }: { name: string }) {
  const label = displayName(name);
  const url = personUrl(name);

  if (!url) return <>{label}</>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className="underline decoration-line-strong underline-offset-2 hover:text-accent"
    >
      {label}
    </a>
  );
}
