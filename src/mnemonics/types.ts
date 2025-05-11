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

export class Definition {
  private constructor(private readonly value: string) {}

  static from(input: string): Result<Definition, string> {
    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return Err("Definition cannot be empty");
    }
    return Ok(new Definition(input.trim()));
  }

  toString(): string {
    return this.value;
  }
}

export class MnemonicsResponse {
  private constructor(
    private readonly mnemonics: Mnemonic[],
    private readonly definition: Definition
  ) {}

  static from(input: {
    mnemonics: string[];
    definition: string;
  }): Result<MnemonicsResponse, string> {
    if (!input || typeof input !== "object") {
      return Err("Invalid response format");
    }

    if (!Array.isArray(input.mnemonics) || input.mnemonics.length !== 3) {
      return Err("Response must contain exactly 3 mnemonics");
    }

    const definitionResult = Definition.from(input.definition);
    if (definitionResult.isErr()) {
      return Err(`Invalid definition: ${definitionResult.error}`);
    }

    const mnemonics: Mnemonic[] = [];
    for (const mnemonic of input.mnemonics) {
      const result = Mnemonic.from(mnemonic);
      if (result.isErr()) {
        return Err(`Invalid mnemonic: ${result.error}`);
      }
      mnemonics.push(result.value);
    }

    return Ok(new MnemonicsResponse(mnemonics, definitionResult.value));
  }

  getMnemonics(): Mnemonic[] {
    return this.mnemonics;
  }

  getDefinition(): Definition {
    return this.definition;
  }
}
