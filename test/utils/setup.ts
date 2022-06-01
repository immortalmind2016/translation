import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import path from "path";

import mongoose from "mongoose";
console.log(process.env);
dotenv.config({
  path: path.join(__dirname, "..", "..", ".env.test"),
});
export default async () => {
  const mongod = await MongoMemoryServer.create({
    binary: {
      version: "4.4.9",
    },
  });
  const uri = mongod.getUri();
  global.__MONGOD__ = mongod;
  process.env.MONGO_URI = uri;
};
