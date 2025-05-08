import { WordInput } from "@/components/word-input";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
      <WordInput />
    </main>
  );
}
