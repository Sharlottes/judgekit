import { readFileSync } from "fs";
import path from "path";

interface Config {
  PROJECT_DIR: string;
  currentLang: Langs;
}
const data = JSON.parse(
  readFileSync(path.resolve(process.cwd(), "./kitconfig.json")).toString()
);
export const config: Config = {
  currentLang: data.currentLang ?? "en",
  PROJECT_DIR: path.resolve(__dirname, ".."),
};
