import fs from "fs";
import path from "path";
import { homedir } from "os";

interface ConfigData {
  testcasePath?: string;
  templatePath?: string;
  generatePath?: string;
  currentLang?: Langs;
}

function findConfigData() {
  const userHomeDir = homedir();
  const localConfigPath = path.resolve(process.cwd(), "./kitconfig.json");
  if (fs.existsSync(localConfigPath))
    return {
      ...JSON.parse(fs.readFileSync(localConfigPath).toString()),
      configPath: localConfigPath,
    };
  const globalConfigPath = path.resolve(userHomeDir, "./kitconfig.json");
  if (fs.existsSync(globalConfigPath))
    return {
      ...JSON.parse(fs.readFileSync(globalConfigPath).toString()),
      configPath: globalConfigPath,
    };
  else {
    fs.writeFileSync(globalConfigPath, JSON.stringify({}));
    return { configPath: globalConfigPath };
  }
}

class Config implements Required<ConfigData> {
  public readonly currentLang: Langs;

  public readonly projectPath: string;
  public readonly terminalPath: string;
  public readonly configPath: string;
  public readonly testcasePath: string;
  public readonly templatePath: string;
  public readonly generatePath: string;

  constructor(data: ConfigData & { configPath: string }) {
    if (!process.env.PWD) throw new Error("this is only for Command Line");
    this.projectPath = path.resolve(__dirname, "..", "..");
    this.terminalPath = path.resolve(process.env.PWD.slice(2));
    this.configPath = data.configPath;

    this.currentLang = data.currentLang || "en";

    this.testcasePath = this.validatePath(
      data.testcasePath,
      "local",
      path.join(this.terminalPath, "./testcase.hjson")
    );
    this.templatePath = this.validatePath(
      data.templatePath,
      "project",
      path.join(this.projectPath, "./templates", "./readline_ex.js")
    );
    this.generatePath = this.validatePath(
      data.generatePath,
      "local",
      path.join(this.terminalPath, "./src")
    );
  }

  /**
   *
   * @param type
   * local - user's local path.
   * project - this(judgekit) project's local path.
   */
  private validatePath(
    fileName: string | undefined,
    type: "local" | "project",
    defaultPath: string
  ): string {
    const dir = type === "local" ? this.terminalPath : this.projectPath;
    if (fileName && fs.existsSync(path.join(dir, fileName)))
      return path.join(dir, fileName);
    else return defaultPath;
  }

  /**
   * @returns is given value is not difference current value
   */
  private validateValue<K extends keyof typeof this>(
    key: K,
    value: typeof this[K]
  ): boolean {
    if (this[key] == value) return true;
    this[key] = value;
    return false;
  }

  public updateConfigs<K extends keyof Required<ConfigData>>(
    data: Record<K, Required<ConfigData>[K]>
  ) {
    let originData: ConfigData | null = null;
    for (const [key, value] of Object.entries<Required<ConfigData>[K]>(data)) {
      if (this.validateValue(key as keyof this, value as this[keyof this]))
        continue;
      if (!originData)
        originData = JSON.parse(fs.readFileSync(this.configPath).toString());
      if (originData) originData[key as K] = value;
    }
    if (originData)
      fs.writeFileSync(this.configPath, JSON.stringify(originData));
  }

  public updateConfig<K extends keyof Required<ConfigData>>(
    key: K,
    value: Required<ConfigData>[K]
  ) {
    if (this.validateValue(key, value as this[keyof this])) return this;
    const originData = JSON.parse(fs.readFileSync(this.configPath).toString());
    originData[key] = value;
    fs.writeFileSync(this.configPath, JSON.stringify(originData));
    return this;
  }
}

export default new Config(findConfigData());
