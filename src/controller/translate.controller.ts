import { Response } from "express";
import { parseTextToOject } from "../utils/parser";

export const translateFile = (req, res) => {
  if (!req.file) {
    res
      .status(400)
      .json({ error: "Your input doesn't contain a required file" });
  }
  const fileData = req?.file?.buffer.toString("utf-8");
  const parsedFileData = parseTextToOject(fileData);
};
