<h1 align="center">Judge Toolkit</h1>
<div align="center">

[![typescript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/license-MIT-critical)](https://github.com/Sharlottes/judgekit/blob/master/LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/sharlottes/judgekit?label=Please%20star%20me%21&style=social)](https://github.com/sharlottes/judgekit/stargazers)

[![Node.js Package](https://github.com/Sharlottes/judgekit/actions/workflows/publish.yml/badge.svg)](https://github.com/Sharlottes/judgekit/actions/workflows/publish.yml)
[![Discord](https://img.shields.io/badge/Sharlotte%230018-7289DA?logo=discord&logoColor=white&style=flat-square)](https://discordapp.com/users/473072758629203980)

\- [한국어](https://github.com/Sharlottes/judgekit/blob/master/readmes/README_ko.md) \-

</div>

the CLI node module for JS code judge quick testing.

Judge Toolkit is made for easy code generation and quick code testing. With this module, every time you test code a new node process is created for running the given script file. You don't need to change any configuration after editing the script file while testing - just press the enter key in the termial!

> **notice**  
> this modules is based on [my tester.js gist](https://gist.github.com/Sharlottes/b2332b88695d11686dab5b9248c433da).
> most things in there are same in here too, but it's not a bad choice to see the gist.

# Installation

because it is CLI modules, i strongly suggest to install in global.

```bash
yarn global add judge-toolkit
npm install -g judge-toolkit
```

# Features

base comamnd is `toolkit`. every arguments, options, subcommands are based on this command.  
first of all, you can see all comamnd and CLI information via `toolkit --help` command.

## Test script

you can run special javascript file by running `test` command as below examples.

```bash
toolkit test <script[.js]>
toolkit test 1000
toolkit test 1000.js
```

because only javascript is valid in this CLI, you don't have to type `.js` extension yourself as you see above command.
also you don't have to restart CLI when changing script file. why? because script processor is re-created everytime you continue test.  
everytime processor is created, it load latest script codes again and again. so you don't have to restart anything anymore.

![](https://i.imgur.com/pMkrByK.gif)

\+ because of this feature, you also don't have to restart CLI when changing testcase hjson file too.

## Test script with Test Case

to load special script file and run testcase datas automatically, you can use `-TC` options as you see below examples.

```bash
toolkit test <script[.js]> -TC
toolkit test <script[.js]> --testcase
toolkit test <script[.js]> --testcase customHJSON.hjson
```

as you see, if you have custom file you can also use it.
the default testcase file's name is `testcase.hjson`.

notice that `-tc` flag is _not_ valid. ~~yeah i know this is weird...~~

### Test Case

the testcase file is designed for automatically input.
you can see example format in [here](https://github.com/Sharlottes/judgekit/blob/master/examples/testcase.hjson)

HJson is more humanatic json format than original Json format. you can see hjson format examples in [here](https://hjson.github.io/try.html)

first of all, the strongest benefit of hjson in this testcase's usage is **multiple line string avaliable**. so if code judge gives I/O examples, you can just copy and paste on this `testcase.hjson`.

`testcase.hjson` is default file of TestCase. you can customize the name and use to `--testcase` flag's value. at least, `testcase.hjson` should be in CMD path (current terminal path).

## Code Generation (WIP)

tired about typing same codes everytime start code exam or judge problems?  
code generation command will copy-paste boilerplate codes from `templates/` directory.

the comamnd format is same as below examples.

```bash
toolkit generate <script_name[.js]> [template_script_name[.js]] [-O outdir]
toolkit generate examples/1000
toolkit generate 1000 -O examples
```

> **notice**  
> currently you can use only one template - `readline_ex.js`, but i will add more template scripts and support custom template via command argument.

## Config

Judge Toolkit CLI accepts config file called `kitconfig.json`. config file should be in current working directory, meaing it is in same path as `testcase.hjson`.

```json
{
  "currentLang": "ko"
}
```

`currentLang` - the language that CLI uses

# TODO

- [x] Internationalize Project
  - [x] support english CLI
  - [x] support korean README
- [ ] support json/yaml testcase format too
- [ ] support pre-run input mapper scripts
- [x] add some code generation templates
  - [ ] more built-in code templates and choose prompt
- [ ] support test code(jest?)
