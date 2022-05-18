import request from "supertest";
import { app, server } from "../../src/index";
import mongoose from "mongoose";
import path from "path";

describe("test the translation routes", () => {
  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });
  it("tests translate file", async () => {
    const { body } = await request(app)
      .post("/translate")
      .field("email", "mohamedsalah.software@gmail.com")
      .attach(
        "files",
        path.join(__dirname, "..", "..", "example", "subtitles.txt")
      );

    expect(body).toEqual({
      message:
        "Subtitles have been successfully translated, We will send it ASAP to your email",
    });
  });
});
