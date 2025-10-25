export function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="top-bar">
      <div className="flex items-center gap-2 w-full">{children}</div>
    </header>
  );
}
