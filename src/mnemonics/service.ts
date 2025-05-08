import { Result, Err } from "ts-results-es";
import { getMnemonics } from "./adapter";
import { Word, MnemonicsResponse } from "./types";

export async function getMnemonicsForWord(
  input: string
): Promise<Result<MnemonicsResponse, string>> {
  const wordResult = Word.from(input);
  if (wordResult.isErr()) {
    return Err(wordResult.error);
  }

  return getMnemonics(wordResult.value);
}
