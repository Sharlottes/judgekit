import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import childProcess from "child_process";
import Strings from "../utils/Strings";
import { Bundle, Config, Log } from "../core";

class CodeGenerator {
  private readonly scriptName: string;

  constructor(scriptName: string, templateName: string, outdir: string) {
    this.scriptName = scriptName;
    Config.updateConfigs({
      generatePath: path.join(Config.terminalPath, outdir),
      templatePath: path.join(
        Config.terminalPath,
        templateName + (templateName.endsWith(".js") ? "" : ".js")
      ),
    });
  }

  private findTemplate(): string {
    console.log(Bundle.current.commands.generate.template_reading.processing);
    console.time(Bundle.current.commands.generate.template_reading.done);
    const templatePath = Config.templatePath;
    if (!fs.existsSync(templatePath)) {
      Log.error(
        Strings.format(
          Bundle.current.commands.generate.template_reading.error,
          Config.templatePath
        )
      );

      process.exit(0);
    }
    const code = fs.readFileSync(templatePath).toString();

    console.timeEnd(Bundle.current.commands.generate.template_reading.done);
    return code;
  }

  public async start(): Promise<void> {
    const templateCodes = this.findTemplate();

    const codePath = path.join(Config.generatePath, `/${this.scriptName}.js`);

    if (fs.existsSync(codePath)) {
      const { confirm_overwrite } = await inquirer.prompt({
        type: "confirm",
        name: "confirm_overwrite",
        message:
          chalk.hex("ffa500")(`[${Bundle.current.global.warn}] `) +
          Bundle.current.commands.generate.overwrite_confirm.exist +
          " " +
          chalk.red(Bundle.current.commands.generate.overwrite_confirm.confirm),
        default: false,
      });
      if (!confirm_overwrite) process.exit(0);
    }

    console.log(
      Strings.format(
        Bundle.current.commands.generate.script_creating.processing,
        `${Config.generatePath}/${this.scriptName}.js`
      )
    );
    console.time(
      Strings.format(
        Bundle.current.commands.generate.script_creating.done,
        `${this.scriptName}.js`
      )
    );
    fs.writeFileSync(codePath, templateCodes);
    console.timeEnd(
      Strings.format(
        Bundle.current.commands.generate.script_creating.done,
        `${this.scriptName}.js`
      )
    );

    childProcess
      .spawn("code", [codePath], { shell: true })
      .stderr.on("data", console.error);
    console.log(
      Strings.format(
        Bundle.current.commands.generate.quick_test_info,
        chalk.cyan(`toolkit test ${Config.generatePath}/${this.scriptName} -TC`)
      ) + `\nhappy hacking :)`
    );
    process.exit(0);
  }
}

export default CodeGenerator;
