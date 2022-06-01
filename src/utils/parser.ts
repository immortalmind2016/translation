import { ParsedText } from "../types";

export const parseTextToOject: (text: string) => ParsedText[] = (text) => {
  const lines = text.split("\n");

  //extract anything between these two characters []
  const timeRegex = /(?<=\[).*(?=])/g;
  //extract anything after this character [
  const textRegex = /(?<=]).*/g;

  return lines.map((line) => {
    if (line == " ") {
      return null;
    }
    const index = line.split(" ")[0];
    const time = line.match(timeRegex)?.[0];

    const text = line.match(textRegex)?.[0].trim();

    return {
      index: Number(index),
      time,
      text,
    };
  });
};
