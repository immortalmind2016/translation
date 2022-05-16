import { parseTextToOject } from "../utils/parser";
import fs from "fs";
import path from "path";

describe("Test the parser", () => {
  it("test the text to object parser", () => {
    const subtitleFile = fs.readFileSync(
      path.join(__dirname, "..", "example", "subtitles.txt"),
      "utf-8"
    );
    expect(parseTextToOject(subtitleFile)).toStrictEqual([
      {
        index: 1,
        text: "I am Arwen - I've come to help you.",
        time: expect.anything(),
      },
      { index: 2, text: "Come back to the light.", time: expect.anything() },
      { index: 3, text: "Nooo, my precious!!.", time: expect.anything() },
    ]);
  });
});
