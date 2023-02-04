# Judge Toolkit

the CLI node module for code judge quick testing.

## About

Judge Toolkit is made for quick code generation and easy code testing.
in this modules, everytime you test code, new node process is created for running given script file. so you don't need to touch something in terminal for testing after changing script file. just enter in termial!

this modules is based on [my tester.js gist](https://gist.github.com/Sharlottes/b2332b88695d11686dab5b9248c433da). most things in there are same in here too, so it's not bad choice to see the gist.

## Installation

because it is CLI modules, i strongly suggest to install in global.

> yarn global add judge-toolkit

or

> npm install -g judge-toolkit

## Command

base comamnd is `toolkit`, every arguments, options, subcommands are based on this command.

### load script

to load special script file, enter this.

> toolkit 1000

p.s. only javascript is valid, so you don't need to type `.js` extension yourself as you see above command.

### load script with testcase mode

to load special script file and run testcase datas automatically, enter this.

> toolkit 1000 -TC

or

> toolkit 1000 --testcase

...or if you have custom file,

> toolkit 1000 -TC customHJSON.hjson

the default testcase file's name is `testcase.hjson`

notice that `-tc` flag is _not_ valid. ~~yeah i know this is weird...~~

## TestCase

the testcase file is designed for automatically input.
you can see example format in [here](https://github.com/Sharlottes/judgekit/blob/master/examples/testcase.hjson)

HJson is more humanatic json format than original Json format. you can see hjson format examples in [here](https://hjson.github.io/try.html)

first of all, the strongest benefit of hjson in this testcase's usage is **multiple line string avaliable**. so if code judge gives I/O examples, you can just copy and paste on this `testcase.hjson`.

`testcase.hjson` is default file of TestCase. you can customize the name and use to `--testcase` flag's value. at least, `testcase.hjson` should be in CMD path (current terminal path).

## TODO

- [ ] supports json testcase format too
- [ ] add some code generation templates
- [ ] supports test code
