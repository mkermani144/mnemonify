import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <Link href="/" className="container flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Mnemonify"
            width={36}
            height={36}
            priority
          />
          <span className="font-bold text-primary">Mnemonify</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
