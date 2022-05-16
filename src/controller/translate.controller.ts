import { Response } from "express";
import { parseTextToOject } from "../utils/parser";
import { scoreSimilarity } from "../utils/scoreSimilarityAlgorithm";
export const translateFile = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "Your input doesn't contain a required file" });
  }
  const fileData = req?.file?.buffer.toString("utf-8");
  const parsedFileData = parseTextToOject(fileData) || [];
  const results = await scoreSimilarity(parsedFileData);
};
