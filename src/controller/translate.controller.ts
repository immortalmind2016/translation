import { Response } from "express";
import { parseTextToOject } from "../utils/parser";
import levenshtein from "js-levenshtein";
export const translateFile = (req, res) => {
  if (!req.file) {
    res
      .status(400)
      .json({ error: "Your input doesn't contain a required file" });
  }
  const fileData = req?.file?.buffer.toString("utf-8");
  const parsedFileData = parseTextToOject(fileData) || [];
  const sentences = parsedFileData.map((sentence) => sentence.text);
};
