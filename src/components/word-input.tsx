"use client";

import { Input } from "@/components/ui/input";
import { getMnemonicsForWord } from "../mnemonics/service";
import { MnemonicsList } from "../mnemonics/components/mnemonics-list";
import { DefinitionBox } from "../mnemonics/components/definition-box";
import { Mnemonic, Definition } from "../mnemonics/types";
import { useState } from "react";

export function WordInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [mnemonics, setMnemonics] = useState<Mnemonic[]>([]);
  const [definition, setDefinition] = useState<Definition | null>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      const input = e.currentTarget.value.trim();
      if (!input) return;

      setIsLoading(true);
      const result = await getMnemonicsForWord(input);
      setIsLoading(false);
      if (result.isOk()) {
        setMnemonics(result.value.getMnemonics());
        setDefinition(result.value.getDefinition());
      } else {
        console.error("Failed to get mnemonics:", result.error);
        setMnemonics([]);
        setDefinition(null);
      }
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-8">
      <Input
        type="text"
        placeholder="Enter a word to learn..."
        className="h-24 text-center !text-6xl text-primary font-medium placeholder:text-xl placeholder:text-muted-foreground flex items-center justify-center border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-primary transition-colors duration-300"
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {definition && <DefinitionBox definition={definition} />}
      {mnemonics.length > 0 && <MnemonicsList mnemonics={mnemonics} />}
    </div>
  );
}
