import Config, { findConfigData } from "./Config";
import fs from "fs";
import path from "path";
import { homedir } from "os";

describe("test Config core", () => {
  describe("test Config.updateConfig()", () => {
    it("should change language config successfully", () => {
      const temp = Config.currentLang;
      Config.updateConfig("currentLang", "en");
      Config.updateConfig("currentLang", "ko");
      expect(Config.currentLang).toBe("ko");

      const data = JSON.parse(
        fs.readFileSync(Config.configPath).toString()
      ) as ConfigData;
      expect(data.currentLang).toBe("ko");
      Config.updateConfig("currentLang", temp);
    });
  });

  describe("testing validatePath() in Config.ts", () => {
    const testCasePath = path.join(Config.terminalPath, "./testcase.hjson");

    it("should get testcase data when its file exists", () => {
      const wasItExist = fs.existsSync(testCasePath);
      fs.writeFileSync(testCasePath, "hello world!");
      JSON.stringify(
        expect(
          Config["validatePath"](
            "./testcase.hjson",
            "local",
            path.join(Config.terminalPath, "./testcase.hjson")
          )
        ).toBe(testCasePath)
      );
      if (!wasItExist) fs.unlinkSync(testCasePath);
    });
  });
  describe("testing findConfigData() in Config.ts", () => {
    const localConfigPath = path.resolve(process.cwd(), "./kitconfig.json");
    const globalConfigPath = path.resolve(homedir(), "./kitconfig.json");
    const temp = fs.readFileSync(globalConfigPath);

    it("should read local config file when it exists", () => {
      fs.writeFileSync(localConfigPath, "{}");
      const { configPath } = findConfigData();
      expect(configPath).toBe(localConfigPath);
      fs.unlinkSync(localConfigPath);
    });

    it("should read global config file when it exists", () => {
      fs.writeFileSync(globalConfigPath, JSON.stringify({ test: "foo" }));
      const { test } = findConfigData();
      expect(test).toBe("foo");
    });

    it("should make global config file when it doesn't exist", () => {
      fs.unlinkSync(globalConfigPath);
      findConfigData();
      expect(fs.existsSync(globalConfigPath)).toBeTruthy();
    });

    fs.writeFileSync(globalConfigPath, temp);
  });
});
