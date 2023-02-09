import fs from "fs";
import HJSON from "hjson";
import YAML from "yaml";
import path from "path";
import childProcess from "child_process";
import rl from "readline";
import inquirer from "inquirer";
import Strings from "../utils/Strings";
import { Bundle, Config, Log } from "../core";

const rlI = rl.createInterface(process.stdin, process.stdout);

const asyncQuestion = async (query: string) =>
  new Promise<string>((res) => rlI.question(query, res));

class JudgeTester {
  private testCaseMode: boolean;
  private readonly codePath: string;

  constructor(codePath: string, options: Record<string, any>) {
    this.codePath = path.join(process.env.INIT_CWD ?? "", codePath);
    this.codePath += codePath.endsWith(".js") ? "" : ".js";
    if (!fs.existsSync(this.codePath)) {
      const errorMsg = Strings.format(
        Bundle.current.commands.test.error_script_notfound,
        this.codePath
      );
      Log.error(errorMsg);
      throw new Error(errorMsg);
    }

    Config.testcasePath =
      options.testcase === true || options.testcase === undefined
        ? Config.testcasePath
        : options.testcase;

    this.testCaseMode = options.testcase !== undefined;
  }

  public start() {
    console.log(
      `    ${Bundle.current.commands.test.title}    `,
      "\n================================="
    );

    this.runner();
  }

  private async runner() {
    while (true) {
      if (this.testCaseMode) await this.runTestCase();
      else await this.runCode();
    }
  }

  private forkProcess(lineHandle: (handler: (line: string) => void) => void) {
    return new Promise<void>((res, rej) => {
      const stack: string[] = [];
      const childPros = childProcess
        .fork(this.codePath, { stdio: "pipe" })
        .on("exit", res)
        .on("error", rej);
      childPros.stdio[1]
        ?.setEncoding("utf-8")
        .on("data", (data: string) => {
          stack.push(data);
        })
        .on("close", () => {
          console.log(stack.join(""));
          childPros.kill();
          res();
        });
      lineHandle((line: string) => {
        stack.push(line + "\n-----------\n");
        childPros.stdio[0]?.write(line);
        childPros.stdio[0]?.end();
      });
    });
  }

  private async parseTestCase(): Promise<string[]> {
    const buffer = fs.readFileSync(
      path.join(process.cwd(), Config.testcasePath)
    );
    if (Config.testcasePath.endsWith(".hjson")) {
      return Array.from<string>(HJSON.parse(buffer.toString()));
    } else if (Config.testcasePath.endsWith(".json")) {
      return Array.from<string>(JSON.parse(buffer.toString()));
    } else if (Config.testcasePath.endsWith(".yaml")) {
      return Array.from<string>(YAML.parse(buffer.toString()));
    } else throw new Error("invalid testcase format!");
  }

  private async runTestCase() {
    const testCases = await this.parseTestCase();

    console.log(
      Strings.format(
        Bundle.current.commands.test.testcase_found,
        testCases.length
      )
    );
    await Promise.all(
      testCases.map((line) => this.forkProcess((handler) => handler(line)))
    );
    const { confirm_testcase } = await inquirer.prompt({
      type: "confirm",
      name: "confirm_testcase",
      message: Bundle.current.commands.test.testcase_continue,
      default: true,
    });
    this.testCaseMode = confirm_testcase;
  }

  private async runCode() {
    await this.forkProcess((handler) => rlI.once("line", (s) => handler(s)));
    await asyncQuestion(Bundle.current.commands.test.test_continue).then(
      (res) => {
        if (res.toUpperCase() == "T") this.testCaseMode = true;
      }
    );
  }
}

export default JudgeTester;
