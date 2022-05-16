import { Response } from "express";

export const translateFile = (req, res) => {
  if (!req.file) {
    res
      .status(400)
      .json({ error: "Your input doesn't contain a required file" });
  }
  const fileData = req?.file?.buffer.toString("utf-8");
};
