import fs from "fs";
import YAML from "yaml";
import path from "path";
import Config from "./Config";

class Bundle {
  public readonly langs: Langs[] = ["en", "ko"];
  public readonly current: BundleData;

  constructor() {
    this.current = this.readBundlefile(Config.currentLang);
  }

  public readBundlefile(lang: Langs): BundleData {
    return YAML.parse(
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
  }
}

export default new Bundle();
