#!/usr/bin/env node

import { program } from "commander";
import JudgeTester from "./commands/JudgeTester";
import CodeGenerator from "./commands/CodeGenerator";
import Config from "./Config";

program
  .version("0.0.5")
  .name("Code Judge Quick-Tester")
  .description("Various of toolCLI for code judge, exam, test, etc.");

program
  .command("config")
  .option("-L, --lang [en|ko]", "the language that cli uses", "en")
  .action((options) => {
    Config.currentLang = options.lang;
  });

program
  .command("test")
  .description("quick code testing with optional testcase file")
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
program
  .command("generate")
  .description("easy boilerplate code generating")
  .argument(
    "<script_name>",
    "the script name to generate. you don't need to type `.js` extension"
  )
  .argument(
    "[template_name]",
    "the template name to copy. default: readline_ex.js",
    "readline_ex.js"
  )
  .option(
    "-O, --outdir [out directory]",
    "output directory for generated script",
    "src"
  )
  .action(
    (scriptName: string, templateName: string, options: Record<string, any>) =>
      new CodeGenerator(scriptName, templateName, options.outdir).start()
  );
program.parse(process.argv);
