import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import childProcess from "child_process";
import Strings from "../utils/Strings";
import { Bundle, Config, Log } from "../core";

class CodeGenerator {
  constructor(
    private readonly scriptName: string,
    private readonly templateName: string,
    private readonly outdir: string
  ) {}

  async init(): Promise<CodeGenerator> {
    const generatePath = fs.existsSync(
      path.join(Config.terminalPath, this.outdir)
    )
      ? path.join(Config.terminalPath, this.outdir)
      : await Promise.reject(
          inquirer.prompt([
            {
              type: "fuzzypath",
              name: "path",
              itemType: "directory",
              rootPath: Config.terminalPath,
              message:
                "cannot find out dir, Select a target directory to add file",
            },
          ])
        );

    Config.updateConfigs({
      generatePath,
      templatePath: path.join(
        Config.projectPath,
        this.templateName + (this.templateName.endsWith(".js") ? "" : ".js")
      ),
    });

    return this;
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
    await new Promise((resolve) =>
      fs.writeFile(codePath, templateCodes, () =>
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
