import { Result, Ok, Err } from "ts-results-es";

export class Mnemonic {
  private constructor(private readonly value: string) {}

  static from(input: string): Result<Mnemonic, string> {
    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return Err("Mnemonic cannot be empty");
    }
    return Ok(new Mnemonic(input.trim()));
  }

  toString(): string {
    return this.value;
  }
}

export class Word {
  private constructor(private readonly value: string) {}

  static from(input: string): Result<Word, string> {
    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return Err("Word cannot be empty");
    }
    // Only allow letters and spaces
    if (!/^[a-zA-Z\s]+$/.test(input.trim())) {
      return Err("Word can only contain letters and spaces");
    }
    return Ok(new Word(input.trim()));
  }

  toString(): string {
    return this.value;
  }
}

export class MnemonicsResponse {
  private constructor(private readonly mnemonics: Mnemonic[]) {}

  static from(input: string[]): Result<MnemonicsResponse, string> {
    if (!Array.isArray(input) || input.length !== 3) {
      return Err("Response must contain exactly 3 mnemonics");
    }

    const mnemonics: Mnemonic[] = [];
    for (const mnemonic of input) {
      const result = Mnemonic.from(mnemonic);
      if (result.isErr()) {
        return Err(`Invalid mnemonic: ${result.error}`);
      }
      mnemonics.push(result.value);
    }

    return Ok(new MnemonicsResponse(mnemonics));
  }

  getMnemonics(): Mnemonic[] {
    return this.mnemonics;
  }
}
