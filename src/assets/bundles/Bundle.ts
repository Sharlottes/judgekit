import fs from "fs";
import YAML from "yaml";
import path from "path";
import { PROJECT_DIR } from "../../Vars";

type Langs = "en" | "ko";
interface BundleData {
  global: Record<"error" | "warn" | "info", string>;
  commands: {
    test: Record<
      "title" | "testcase_found" | "testcase_continue" | "test_continue",
      string
    >;
    generate: {
      template_reading: Record<"processing" | "done" | "error", string>;
      overwrite_confirm: Record<"exist" | "confirm", string>;
      script_creating: Record<"processing" | "done", string>;
      quick_test_info: string;
    };
  };
}

class Bundle {
  public readonly langs: Langs[] = ["en", "ko"];
  public readonly bundles: Record<Langs, BundleData>;
  public currentLang: Langs = "en";

  constructor() {
    const readYAMLfile = (lang: string): BundleData =>
      YAML.parse(
        fs.readFileSync(
          path.join(PROJECT_DIR, "/assets", "/bundles", `bundle_${lang}.yaml`),
          "utf8"
        )
      );

    this.bundles = Object.fromEntries(
      this.langs.map((lang) => [lang, readYAMLfile(lang)])
    ) as Record<Langs, BundleData>;
  }
}

const instance = new Bundle();
export default instance.bundles[instance.currentLang];
