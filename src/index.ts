import { program } from "commander";
import JudgeTester from "./JudgeTester";

program
  .version("0.0.1v")
  .name("Code Judge Quick-Tester")
  .description("arious of toolCLI for code judge, exam, test, etc.");
program
  .argument(
    "<codepath>",
    "the javascript code file name or path. it does't need to contain extension"
  )
  .option(
    "-TC, --testcase [case_path]",
    "enable testcase mode and test datas from given hjson file."
  )
  .action((codePath: string, options: Record<string, any>) => {
    new JudgeTester(codePath, options).start();
  });
program.parse(process.argv);
