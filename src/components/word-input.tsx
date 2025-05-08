"use client";

import { Input } from "@/components/ui/input";
import { getMnemonicsForWord } from "../mnemonics/service";
import { MnemonicsList } from "../mnemonics/components/mnemonics-list";
import { Mnemonic } from "../mnemonics/types";
import { useState } from "react";

export function WordInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [mnemonics, setMnemonics] = useState<Mnemonic[]>([]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      setIsLoading(true);
      const result = await getMnemonicsForWord(e.currentTarget.value);
      setIsLoading(false);

      if (result.isOk()) {
        setMnemonics(result.value.getMnemonics());
      } else {
        console.error("Error:", result.error);
        setMnemonics([]);
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
      {mnemonics.length > 0 && <MnemonicsList mnemonics={mnemonics} />}
    </div>
  );
}
