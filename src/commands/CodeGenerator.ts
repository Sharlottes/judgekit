import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import childProcess from "child_process";
import Bundle from "../Bundle";
import Log from "../Log";
import Strings from "../utils/Strings";

class CodeGenerator {
  private readonly scriptName: string;
  private readonly templateName: string;
  private readonly outdir: string;

  constructor(scriptName: string, templateName: string, outdir: string) {
    this.scriptName = scriptName;
    this.outdir = outdir;
    this.templateName =
      templateName + (templateName.endsWith(".js") ? "" : ".js");
  }

  private findTemplate(): string {
    console.log(Bundle.current.commands.generate.template_reading.processing);
    console.time(Bundle.current.commands.generate.template_reading.done);
    const templatePath = path.join(
      __dirname,
      "../templates",
      this.templateName
    );
    if (!fs.existsSync(templatePath)) {
      Log.error(
        Strings.format(
          Bundle.current.commands.generate.template_reading.error,
          `../templates/${this.templateName}`
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

    const codePath = path.join(
      process.cwd(),
      this.outdir,
      `/${this.scriptName}.js`
    );

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
        `${this.outdir}/${this.scriptName}.js`
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
        chalk.cyan(`toolkit test ${this.outdir}/${this.scriptName} -TC`)
      ) + `\nhappy hacking :)`
    );
    process.exit(0);
  }
}

export default CodeGenerator;
