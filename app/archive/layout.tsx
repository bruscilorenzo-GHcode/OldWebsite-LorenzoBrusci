export default function ArchiveLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="register-paper min-h-screen bg-bg text-ink">
      {children}
    </div>
  );
}
