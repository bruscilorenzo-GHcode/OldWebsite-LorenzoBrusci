import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell grid12 gap-y-6 py-20">
      <div className="col-span-12 md:col-span-8">
        <p className="eyebrow">404</p>
        <h1 className="display mt-4 max-w-[14ch]">This page is not in the archive.</h1>
        <p className="mt-6 max-w-[46ch] text-lg text-ink-2">
          The address may have belonged to the old site and was not carried over.
        </p>
        <Link href="/" className="link-arrow mt-8 inline-flex">
          Return to the index
        </Link>
      </div>
    </section>
  );
}
