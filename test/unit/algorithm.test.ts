import { scoreSimilarity } from "../../src/utils/scoreSimilarityAlgorithm";
import { ParsedText } from "../../src/types";
import mongoose from "mongoose";

describe("Test the score similarity algorithm", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI + "lengoo");
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it("should pass the test and return the desired output", async () => {
    const data = {
      index: 0,
      text: "hello",
      time: "[00-00-20 00-00-21]",
    };
    const textDataFile: ParsedText[] = [data];
    expect(await scoreSimilarity(textDataFile)).toStrictEqual([
      {
        similar: [],
        message: data.text,
        index: data.index,
        time: data.time,
      },
    ]);
  });
});
