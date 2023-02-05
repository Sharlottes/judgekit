import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import childProcess from "child_process";

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
    console.log("템플릿 코드 읽어들이는 중...");
    console.time("읽어들이기 완료!");
    const templatePath = path.join(__dirname, "./templates", this.templateName);
    if (!fs.existsSync(templatePath)) {
      console.error(
        `${chalk.red("[에러!]")} ./templates/${
          this.templateName
        }가 존재하지 않습니다.`
      );
      process.exit(0);
    }
    const code = fs.readFileSync(templatePath).toString();

    console.timeEnd("읽어들이기 완료!");
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
        message: `${chalk.hex("ffa500")(
          "[경고!]"
        )} 이미 해당 이름의 파일이 존재합니다. ${chalk.red(
          "기존 파일을 덮어씌우시겠습니까?"
        )}`,
        default: false,
      });
      if (!confirm_overwrite) process.exit(0);
    }

    console.log(`${this.outdir}/${this.scriptName}.js 생성 중...`);
    console.time(`${this.scriptName}.js 생성 및 열람 완료!`);
    fs.writeFileSync(codePath, templateCodes);
    console.timeEnd(`${this.scriptName}.js 생성 및 열람 완료!`);

    childProcess
      .spawn("code", [codePath], { shell: true })
      .stderr.on("data", console.error);
    console.log(
      `\n\u001b[36;1mtoolkit ${this.outdir}/${this.scriptName} -TC\u001b[0m 로 빠른 퀵테스트를 할 수 있습니다!` +
        `\nhappy hacking :)`
    );
    process.exit(0);
  }
}

export default CodeGenerator;
