import fs from "fs";
import HJSON from "hjson";
import path from "path";
import childProcess from "child_process";
import rl from "readline";

const rlI = rl.createInterface(process.stdin, process.stdout);

const asyncQuestion = async (query: string) =>
  new Promise<string>((res) => rlI.question(query, res));

class JudgeTester {
  private testCaseMode: boolean;
  private readonly testCasePath: string;
  private readonly codePath: string;

  constructor(codePath: string, options: Record<string, any>) {
    this.codePath = codePath;
    this.testCasePath =
      options.testcase === true || options.testcase === undefined
        ? "testcase.hjson"
        : options.testcase;
    this.testCaseMode = options.testcase !== undefined;
  }

  public start() {
    console.log(
      "    Node.js 백준 문제 테스터    ",
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

  private async runTestCase() {
    const buffer = fs.readFileSync(path.join(__dirname, this.testCasePath));
    const testCases = Array.from<string>(HJSON.parse(buffer.toString()));

    console.log(
      `${testCases.length}개의 테스트 케이스 발견! 모두 동시에 실행됩니다...`
    );
    await Promise.all(
      testCases.map((line) => this.forkProcess((handler) => handler(line)))
    );
    await asyncQuestion(
      "테스트 케이스를 계속 진행할까요? [Y,y / N,n] (기본 Y)"
    ).then((res) => {
      if (res.toUpperCase() == "N") this.testCaseMode = false;
    });
  }

  private async runCode() {
    await this.forkProcess((handler) => rlI.once("line", (s) => handler(s)));
    await asyncQuestion(
      "아무 키를 누르세요... (테스트 케이스 계속하기: [T])"
    ).then((res) => {
      if (res.toUpperCase() == "T") this.testCaseMode = true;
    });
  }
}

export default JudgeTester;
