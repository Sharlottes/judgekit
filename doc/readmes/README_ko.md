<h1 align="center">Judgekit</h1>
<div align="center">

[![typescript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/badge/license-MIT-critical)](https://github.com/Sharlottes/judgekit/blob/master/LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/sharlottes/judgekit?label=Please%20star%20me%21&style=social)](https://github.com/sharlottes/judgekit/stargazers)

[![Node.js Package](https://github.com/Sharlottes/judgekit/actions/workflows/publish.yml/badge.svg)](https://github.com/Sharlottes/judgekit/actions/workflows/publish.yml)
[![Discord](https://img.shields.io/badge/Sharlotte%230018-7289DA?logo=discord&logoColor=white&style=flat-square)](https://discordapp.com/users/473072758629203980)

\- [한국어](https://github.com/Sharlottes/judgekit/blob/master/readmes/README_ko.md) \-

</div>

Judgekit는 빠른 코드 테스트와 쉬운 코드 생성을 위해 만들어졌습니다.
이 모듈에선 매번 테스트를 할 때마다 새로운 Node.js 프로세서가 주어진 스크립트 파일을 실행하기 위해 생성됩니다.  
그러므로 스크립트 파일을 변경하고 나서 터미널에서 뭔갈 건드릴 필요가 없습니다. 그냥 엔터 키만 누르면 됩니다!

> **참고**  
> 이 모듈은 [제 tester.js gist](https://gist.github.com/Sharlottes/b2332b88695d11686dab5b9248c433da)를 기반으로 하고 있습니다.  
> 저기에 있는 대부분은 여기에서도 동일하지만 gist를 보는건 나쁘지 않은 선택입니다.

# 설치

이건 CLI 모듈이기 때문에 전역으로 설치할걸 강력히 권고합니다.

```bash
yarn global add judgekit
npm install -g judgekit
```

# 특징

기본 명령어는 `judgekit`입니다. 모든 인자, 옵션, 부속명령어들은 이 명령어를 기반으로 두고 있습니다.
먼저, `judgekit --help` 명령어로 모든 명령어와 CLI 설명을 볼 수 있습니다.

## 스크립트 테스트하기

특정 자바스크립트 파일을 아래 예제와 같이 `test` 명령어로 실행할 수 있습니다.

```bash
judgekit test <script[.js]>
judgekit test 1000
judgekit test 1000.js
```

이 CLI에선 오직 자바스크립트만이 허용되기 때문에 위 예제와 같이 `.js` 확장자를 직접 입력할 필욘 없습니다. 또한 스크립트 파일을 바꿀 때 CLI를 재시작할 필요가 없습니다. 왜냐하면 스크립트 프로세서는 테스트를 계속할 때마다 재생성되기 때문입니다.  
프로세서가 생성될 때마다, 프로세서는 최신 스크립트 코드를 다시, 또다시 불러옵니다. 그러므로 더이상 뭔가를 재시작할 필요가 없습니다.

![](https://i.imgur.com/pMkrByK.gif)

\+ 이 특징 때문에, 테스트 케이스 hjson 파일을 바꿀 때에도 CLI를 재시작할 필요도 없습니다.

## 테스트 케이스로 스크립트 테스트하기

특정 스크립트 파일을 불러오고 자동으로 테스트 케이스를 실행하고 싶으시다면 아래 예제들과 같이 `-TC` 옵션을 사용하면 됩니다.

```bash
judgekit test <script[.js]> -TC
judgekit test <script[.js]> --testcase
judgekit test <script[.js]> --testcase customHJSON.hjson
```

보다시피 커스텀 파일이 있다면 그걸 사용할 수도 있습니다. 기본 테스트케이스 파일 이름은 `testcase.hjson` 입니다.  
`-tc`는 올바른 옵션명이 아닌 것에 유의하세요.

### 테스트 케이스

테스트 케이스 파일은 자동 입력을 위해 고안되었습니다.
예제는 [여기](https://github.com/Sharlottes/judgekit/blob/master/examples/testcase.hjson)를 참고하세요.

테스트 케이스는 [json](https://ko.wikipedia.org/wiki/JSON), [hjson](https://hjson.github.io/try.html), [yaml](https://ko.wikipedia.org/wiki/YAML)로 총 세 가지 서식이 될 수 있습니다.

`testcase.hjson`는 테스트 케이스의 기본 파일명입니다. `--testcase` 옵션을 통해 다른 이름의 테스트 케이스를 사용할 수 있습니다. `testcase.hjson`는 최소한 현재 실행 경로에 있어야 합니다.

## 코드 생성 (WIP)

코드 테스트에서 매번 똑같은 코드를 입력하는 것에 지치셨나요?  
코드 생성 명령어는 `templates/` 디렉토리에서 템플릿을 불러와 보일러플레이트 코드들을 복사-붙여넣기할 것입니다.

명령어 문법은 아래 예제와 같습니다.

```bash
judgekit generate <script_name[.js]> [template_script_name[.js]] [-O outdir]
judgekit generate examples/1000
judgekit generate 1000 -O examples
```

> **참고**
> 현재는 오직 `readline_ex.js` 템플릿만 사용할 수 있습니다. 하지만 전 더 많은 템플릿과 매개변수를 통한 확장 기능을 추가할겁니다.

## 설정

Judge judgekit CLI 는 `kitconfig.json`로 설정 파일을 가져옵니다.  
설정 파일은 유저 디렉토리에 자동으로 생성됩니다. 프로젝트 루트 경로에 설정 파일이 있을 경우 CLI는 그걸 먼저 불러옵니다. 설정 파일은 CLI 설정과 옵션 케싱에 사용됩니다. `judgekit test 1000 -TC specialTestCase.json` 명령어로 예를 들자면, 설정은 이 옵션을 설정 파일에 기록할 것입니다. 그러므로 옵션을 설정하고 나면 그 옵션을 다시 사용할 필요가 없어집니다.

```bash
judgekit test 1000 -TC testcase.yaml
judgekit test 1000 -TC
```

### format

설정 파일은 아래 기본 설정과 동일합니다.

```json
{
  "currentLang": "en",
  "testcasePath": "testcase.hjson",
  "templatePath": "readline_ex.js",
  "generatePath": "src"
}
```

### 설정 명령어

또한 일부 설정은 `judgekit config`로 설정할 수 있습니다.  
현재 `currentLang` 설정만을 위해 사용할 수 있습니다.

```bash
judgekit config -L en
judgekit config --lang ko
```
