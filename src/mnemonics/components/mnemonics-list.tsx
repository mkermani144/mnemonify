import { Mnemonic } from "../types";
import { toast } from "sonner";

interface MnemonicsListProps {
  mnemonics: Mnemonic[];
}

export function MnemonicsList({ mnemonics }: MnemonicsListProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text:", error);
      toast("Failed to copy to clipboard");
    }
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {mnemonics.map((mnemonic) => {
        const mnemonicString = mnemonic.toString();
        const parts = mnemonicString.split(/'([^']+)'/);
        return (
          <div
            key={mnemonicString}
            className="rounded-lg border-2 border-transparent bg-card p-4 text-card-foreground shadow-sm transition-colors hover:border-primary cursor-pointer"
            onClick={() => copyToClipboard(mnemonicString)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                copyToClipboard(mnemonicString);
              }
            }}
          >
            <p className="text-lg">
              {parts.map((part, i) => {
                // Odd indices are the key words
                if (i % 2 === 1) {
                  return (
                    <span key={i} className="text-primary font-medium">
                      {part}
                    </span>
                  );
                }
                return part;
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}
