import { cleanEnv, port, str } from "envalid";
import "dotenv/config";

const config = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  MONGO_URI: str(),
});

export default config;
