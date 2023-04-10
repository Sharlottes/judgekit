import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import childProcess from "child_process";
import Strings from "../utils/Strings";
import { Bundle, Config } from "../core";
import PathFinder from "../core/PathFinder";

export class CodeGeneratorInitor {
  public static async init(
    scriptName: string,
    templateName: string,
    outdir: string
  ): Promise<CodeGenerator> {
    const generatePath = await PathFinder.find(outdir, "PWD", {
      isFile: false,
    });
    const templatePath = await PathFinder.find(
      templateName + (templateName.endsWith(".js") ? "" : ".js"),
      "Judgekit",
      {
        excludePath: (path) => !path.endsWith(".js"),
      }
    );

    Config.updateConfigs({
      generatePath,
      templatePath,
    });

    return new CodeGenerator(scriptName);
  }
}

class CodeGenerator {
  constructor(private readonly scriptName: string) {}

  private findTemplate(): string {
    console.log(Bundle.current.commands.generate.template_reading.processing);
    console.time(Bundle.current.commands.generate.template_reading.done);
    const code = fs.readFileSync(Config.templatePath).toString();
    console.timeEnd(Bundle.current.commands.generate.template_reading.done);
    return code;
  }

  public async start(): Promise<void> {
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
        `${this.scriptName}.js`
      )
    );
    console.time(
      Strings.format(
        Bundle.current.commands.generate.script_creating.done,
        `${this.scriptName}.js`
      )
    );
    await new Promise((resolve) =>
      fs.writeFile(codePath, this.findTemplate(), () =>
        childProcess
          .spawn("code", ["-r", path.resolve(codePath)], { shell: true })
          .on("exit", resolve)
      )
    );
    console.timeEnd(
      Strings.format(
        Bundle.current.commands.generate.script_creating.done,
        `${this.scriptName}.js`
      )
    );

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
