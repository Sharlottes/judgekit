# Judge Toolkit

the CLI node module for code judge quick testing.

Judge Toolkit is made for quick code generation and easy code testing.
in this modules, everytime you test code, new node process is created for running given script file.
so you don't need to touch something in terminal for testing after changing script file. just enter in termial!

this modules is based on [my tester.js gist](https://gist.github.com/Sharlottes/b2332b88695d11686dab5b9248c433da).
most things in there are same in here too, so it's not bad choice to see the gist.

# Installation

because it is CLI modules, i strongly suggest to install in global.

```bash
yarn global add judge-toolkit
npm install -g judge-toolkit
```

# Features

base comamnd is `toolkit`, every arguments, options, subcommands are based on this command.
first of all, you can all comamnd via `toolkit --help` command.

## Test script

you can run special javascript file by running this command.

```bash
toolkit test <script[.js]>
toolkit test 1000
toolkit test 1000.js
```

because only javascript is valid in this CLI, you don't have to type `.js` extension yourself as you see above command.
also you don't have to restart CLI when changing script file. why? because script processor is re-created everytime you continue test.
everytime processor is created, it load latest script codes again and again. so you don't have to restart anything anymore.
because of this feature, you also don't have to restart CLI when changing testcase hjson file too.

## Test script with Test Case

to load special script file and run testcase datas automatically, enter this.

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
currently you can only one template - `readline_ex.js`, but i will add more template scripts and support custom template via comamnd argument.

you can use code generation by this command.

```bash
toolkit generate <script_name[.js]> [target_template_script] [-O outdir]
toolkit generate examples/1000
toolkit generate 1000 -O examples
```

# TODO

- [ ] Internationalize Project
  - [x] support english CLI
  - [ ] support korean README
- [ ] support json testcase format too
- [x] add some code generation templates
  - [ ] more built-in code templates and choose prompt
- [ ] support test code(jest?)
