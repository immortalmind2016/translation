import { cleanEnv, port } from "envalid";
import "dotenv/config";

const config = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
});

export default config;
