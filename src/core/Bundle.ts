import fs from "fs";
import YAML from "yaml";
import path from "path";
import Config from "./Config";

class Bundle {
  public readonly langs: Langs[] = ["en", "ko"];
  public readonly bundles: Record<Langs, BundleData>;
  public get current(): BundleData {
    return this.bundles[Config.currentLang];
  }

  constructor() {
    const readYAMLfile = (lang: string): BundleData =>
      YAML.parse(
        fs.readFileSync(
          path.join(
            Config.projectPath,
            "/assets",
            "/bundles",
            `bundle_${lang}.yaml`
          ),
          "utf8"
        )
      );

    this.bundles = Object.fromEntries(
      this.langs.map((lang) => [lang, readYAMLfile(lang)])
    ) as Record<Langs, BundleData>;
  }
}

export default new Bundle();
