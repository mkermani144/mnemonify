import { Result, Ok, Err } from "ts-results-es";
import { MnemonicsResponse, Word } from "./types";

const baseUrl = process.env.NEXT_PUBLIC_MNEMONICS_API_URL;
if (!baseUrl) {
  throw new Error(
    "NEXT_PUBLIC_MNEMONICS_API_URL environment variable is not set"
  );
}

export async function getMnemonics(
  word: Word
): Promise<Result<MnemonicsResponse, string>> {
  try {
    const response = await fetch(
      `${baseUrl}?word=${encodeURIComponent(word.toString())}`
    );

    if (!response.ok) {
      return Err(`Failed to fetch mnemonics: ${response.statusText}`);
    }

    const data = await response.json();
    return MnemonicsResponse.from(data);
  } catch (error) {
    return Err(
      `Failed to fetch mnemonics: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
