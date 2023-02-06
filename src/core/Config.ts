import fs from "fs";
import path from "path";
import { homedir } from "os";

interface ConfigData {
  testcasePath?: string;
  templatePath?: string;
  generatePath?: string;
  currentLang?: Langs;
}

function findConfigData(): ConfigData & { configPath: string } {
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
  public readonly projectPath = path.resolve(__dirname, "..");
  public readonly configPath: string;
  private _currentLang: Langs;
  private _testcasePath: string;
  private _templatePath: string;
  private _generatePath: string;

  constructor(data: ConfigData & { configPath: string }) {
    this.configPath = data.configPath;
    this._currentLang = data.currentLang ?? "en";
    this._testcasePath = data.testcasePath ?? "testcase.hjson";
    this._templatePath = data.templatePath ?? "readline_ex.js";
    this._generatePath = data.generatePath ?? "src";
  }

  get testcasePath() {
    return this._testcasePath;
  }
  set testcasePath(value: string) {
    this._testcasePath = value;
    if (this._testcasePath != value)
      this.updateConfigFile({ testcasePath: value });
  }
  get currentLang() {
    return this._currentLang;
  }
  set currentLang(value: Langs) {
    this._currentLang = value;
    if (this._currentLang != value)
      this.updateConfigFile({ currentLang: value });
  }
  get templatePath() {
    return this._templatePath;
  }
  set templatePath(value: string) {
    this._templatePath = value;
    if (this._templatePath != value)
      this.updateConfigFile({ templatePath: value });
  }
  get generatePath() {
    return this._generatePath;
  }
  set generatePath(value: string) {
    this._generatePath = value;
    if (this._generatePath != value)
      this.updateConfigFile({ generatePath: value });
  }

  private async updateConfigFile(data: Partial<ConfigData>) {
    const config = {
      ...data,
      ...(await new Promise<Buffer>((res) =>
        fs.readFile(this.configPath, {}, (_, buffer) => res(buffer))
      ).then((buffer) => JSON.parse(buffer.toString()))),
    };
    await new Promise<void>((res) =>
      fs.writeFile(this.configPath, JSON.stringify(config), {}, () => res())
    );
  }
}

export default new Config(findConfigData());
