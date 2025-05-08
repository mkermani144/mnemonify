import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <a href="/">
          <span className="font-bold text-primary">Mnemonify</span>
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
