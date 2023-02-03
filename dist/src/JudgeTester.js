"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fs = _interopRequireDefault(require("fs"));
var _hjson = _interopRequireDefault(require("hjson"));
var _path = _interopRequireDefault(require("path"));
var _child_process = _interopRequireDefault(require("child_process"));
var _readline = _interopRequireDefault(require("readline"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var rlI = _readline["default"].createInterface(process.stdin, process.stdout);
var asyncQuestion = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (res) {
            return rlI.question(query, res);
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function asyncQuestion(_x) {
    return _ref.apply(this, arguments);
  };
}();
var JudgeTester = /*#__PURE__*/function () {
  function JudgeTester(codePath, options) {
    _classCallCheck(this, JudgeTester);
    _defineProperty(this, "testCaseMode", void 0);
    _defineProperty(this, "testCasePath", void 0);
    _defineProperty(this, "codePath", void 0);
    this.codePath = codePath;
    this.testCasePath = options.testcase === true || options.testcase === undefined ? "testcase.hjson" : options.testcase;
    this.testCaseMode = options.testcase !== undefined;
  }
  _createClass(JudgeTester, [{
    key: "start",
    value: function start() {
      console.log("    Node.js 백준 문제 테스터    ", "\n=================================");
      this.runner();
    }
  }, {
    key: "runner",
    value: function () {
      var _runner = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!true) {
                _context2.next = 10;
                break;
              }
              if (!this.testCaseMode) {
                _context2.next = 6;
                break;
              }
              _context2.next = 4;
              return this.runTestCase();
            case 4:
              _context2.next = 8;
              break;
            case 6:
              _context2.next = 8;
              return this.runCode();
            case 8:
              _context2.next = 0;
              break;
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function runner() {
        return _runner.apply(this, arguments);
      }
      return runner;
    }()
  }, {
    key: "forkProcess",
    value: function forkProcess(lineHandle) {
      var _this = this;
      return new Promise(function (res, rej) {
        var _childPros$stdio$;
        var stack = [];
        var childPros = _child_process["default"].fork(_this.codePath, {
          stdio: "pipe"
        }).on("exit", res).on("error", rej);
        (_childPros$stdio$ = childPros.stdio[1]) === null || _childPros$stdio$ === void 0 ? void 0 : _childPros$stdio$.setEncoding("utf-8").on("data", function (data) {
          stack.push(data);
        }).on("close", function () {
          console.log(stack.join(""));
          childPros.kill();
          res();
        });
        lineHandle(function (line) {
          var _childPros$stdio$2, _childPros$stdio$3;
          stack.push(line + "\n-----------\n");
          (_childPros$stdio$2 = childPros.stdio[0]) === null || _childPros$stdio$2 === void 0 ? void 0 : _childPros$stdio$2.write(line);
          (_childPros$stdio$3 = childPros.stdio[0]) === null || _childPros$stdio$3 === void 0 ? void 0 : _childPros$stdio$3.end();
        });
      });
    }
  }, {
    key: "runTestCase",
    value: function () {
      var _runTestCase = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this2 = this;
        var buffer, testCases;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              buffer = _fs["default"].readFileSync(_path["default"].join(__dirname, this.testCasePath));
              testCases = Array.from(_hjson["default"].parse(buffer.toString()));
              console.log("".concat(testCases.length, "\uAC1C\uC758 \uD14C\uC2A4\uD2B8 \uCF00\uC774\uC2A4 \uBC1C\uACAC! \uBAA8\uB450 \uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uB429\uB2C8\uB2E4..."));
              _context3.next = 5;
              return Promise.all(testCases.map(function (line) {
                return _this2.forkProcess(function (handler) {
                  return handler(line);
                });
              }));
            case 5:
              _context3.next = 7;
              return asyncQuestion("테스트 케이스를 계속 진행할까요? [Y,y / N,n] (기본 Y)").then(function (res) {
                if (res.toUpperCase() == "N") _this2.testCaseMode = false;
              });
            case 7:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function runTestCase() {
        return _runTestCase.apply(this, arguments);
      }
      return runTestCase;
    }()
  }, {
    key: "runCode",
    value: function () {
      var _runCode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var _this3 = this;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.forkProcess(function (handler) {
                return rlI.once("line", function (s) {
                  return handler(s);
                });
              });
            case 2:
              _context4.next = 4;
              return asyncQuestion("아무 키를 누르세요... (테스트 케이스 계속하기: [T])").then(function (res) {
                if (res.toUpperCase() == "T") _this3.testCaseMode = true;
              });
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function runCode() {
        return _runCode.apply(this, arguments);
      }
      return runCode;
    }()
  }]);
  return JudgeTester;
}();
var _default = JudgeTester;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJybEkiLCJybCIsImNyZWF0ZUludGVyZmFjZSIsInByb2Nlc3MiLCJzdGRpbiIsInN0ZG91dCIsImFzeW5jUXVlc3Rpb24iLCJxdWVyeSIsIlByb21pc2UiLCJyZXMiLCJxdWVzdGlvbiIsIkp1ZGdlVGVzdGVyIiwiY29kZVBhdGgiLCJvcHRpb25zIiwidGVzdENhc2VQYXRoIiwidGVzdGNhc2UiLCJ1bmRlZmluZWQiLCJ0ZXN0Q2FzZU1vZGUiLCJjb25zb2xlIiwibG9nIiwicnVubmVyIiwicnVuVGVzdENhc2UiLCJydW5Db2RlIiwibGluZUhhbmRsZSIsInJlaiIsInN0YWNrIiwiY2hpbGRQcm9zIiwiY2hpbGRQcm9jZXNzIiwiZm9yayIsInN0ZGlvIiwib24iLCJzZXRFbmNvZGluZyIsImRhdGEiLCJwdXNoIiwiam9pbiIsImtpbGwiLCJsaW5lIiwid3JpdGUiLCJlbmQiLCJidWZmZXIiLCJmcyIsInJlYWRGaWxlU3luYyIsInBhdGgiLCJfX2Rpcm5hbWUiLCJ0ZXN0Q2FzZXMiLCJBcnJheSIsImZyb20iLCJISlNPTiIsInBhcnNlIiwidG9TdHJpbmciLCJsZW5ndGgiLCJhbGwiLCJtYXAiLCJmb3JrUHJvY2VzcyIsImhhbmRsZXIiLCJ0aGVuIiwidG9VcHBlckNhc2UiLCJvbmNlIiwicyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9KdWRnZVRlc3Rlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCBISlNPTiBmcm9tIFwiaGpzb25cIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5pbXBvcnQgcmwgZnJvbSBcInJlYWRsaW5lXCI7XHJcblxyXG5jb25zdCBybEkgPSBybC5jcmVhdGVJbnRlcmZhY2UocHJvY2Vzcy5zdGRpbiwgcHJvY2Vzcy5zdGRvdXQpO1xyXG5cclxuY29uc3QgYXN5bmNRdWVzdGlvbiA9IGFzeW5jIChxdWVyeTogc3RyaW5nKSA9PlxyXG4gIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlcykgPT4gcmxJLnF1ZXN0aW9uKHF1ZXJ5LCByZXMpKTtcclxuXHJcbmNsYXNzIEp1ZGdlVGVzdGVyIHtcclxuICBwcml2YXRlIHRlc3RDYXNlTW9kZTogYm9vbGVhbjtcclxuICBwcml2YXRlIHJlYWRvbmx5IHRlc3RDYXNlUGF0aDogc3RyaW5nO1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY29kZVBhdGg6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoY29kZVBhdGg6IHN0cmluZywgb3B0aW9uczogUmVjb3JkPHN0cmluZywgYW55Pikge1xyXG4gICAgdGhpcy5jb2RlUGF0aCA9IGNvZGVQYXRoO1xyXG4gICAgdGhpcy50ZXN0Q2FzZVBhdGggPVxyXG4gICAgICBvcHRpb25zLnRlc3RjYXNlID09PSB0cnVlIHx8IG9wdGlvbnMudGVzdGNhc2UgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gXCJ0ZXN0Y2FzZS5oanNvblwiXHJcbiAgICAgICAgOiBvcHRpb25zLnRlc3RjYXNlO1xyXG4gICAgdGhpcy50ZXN0Q2FzZU1vZGUgPSBvcHRpb25zLnRlc3RjYXNlICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgXCIgICAgTm9kZS5qcyDrsLHspIAg66y47KCcIO2FjOyKpO2EsCAgICBcIixcclxuICAgICAgXCJcXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIlxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnJ1bm5lcigpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBydW5uZXIoKSB7XHJcbiAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICBpZiAodGhpcy50ZXN0Q2FzZU1vZGUpIGF3YWl0IHRoaXMucnVuVGVzdENhc2UoKTtcclxuICAgICAgZWxzZSBhd2FpdCB0aGlzLnJ1bkNvZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZm9ya1Byb2Nlc3MobGluZUhhbmRsZTogKGhhbmRsZXI6IChsaW5lOiBzdHJpbmcpID0+IHZvaWQpID0+IHZvaWQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzLCByZWopID0+IHtcclxuICAgICAgY29uc3Qgc3RhY2s6IHN0cmluZ1tdID0gW107XHJcbiAgICAgIGNvbnN0IGNoaWxkUHJvcyA9IGNoaWxkUHJvY2Vzc1xyXG4gICAgICAgIC5mb3JrKHRoaXMuY29kZVBhdGgsIHsgc3RkaW86IFwicGlwZVwiIH0pXHJcbiAgICAgICAgLm9uKFwiZXhpdFwiLCByZXMpXHJcbiAgICAgICAgLm9uKFwiZXJyb3JcIiwgcmVqKTtcclxuICAgICAgY2hpbGRQcm9zLnN0ZGlvWzFdXHJcbiAgICAgICAgPy5zZXRFbmNvZGluZyhcInV0Zi04XCIpXHJcbiAgICAgICAgLm9uKFwiZGF0YVwiLCAoZGF0YTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICBzdGFjay5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coc3RhY2suam9pbihcIlwiKSk7XHJcbiAgICAgICAgICBjaGlsZFByb3Mua2lsbCgpO1xyXG4gICAgICAgICAgcmVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGxpbmVIYW5kbGUoKGxpbmU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIHN0YWNrLnB1c2gobGluZSArIFwiXFxuLS0tLS0tLS0tLS1cXG5cIik7XHJcbiAgICAgICAgY2hpbGRQcm9zLnN0ZGlvWzBdPy53cml0ZShsaW5lKTtcclxuICAgICAgICBjaGlsZFByb3Muc3RkaW9bMF0/LmVuZCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBydW5UZXN0Q2FzZSgpIHtcclxuICAgIGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCB0aGlzLnRlc3RDYXNlUGF0aCkpO1xyXG4gICAgY29uc3QgdGVzdENhc2VzID0gQXJyYXkuZnJvbTxzdHJpbmc+KEhKU09OLnBhcnNlKGJ1ZmZlci50b1N0cmluZygpKSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXHJcbiAgICAgIGAke3Rlc3RDYXNlcy5sZW5ndGh96rCc7J2YIO2FjOyKpO2KuCDsvIDsnbTsiqQg67Cc6rKsISDrqqjrkZAg64+Z7Iuc7JeQIOyLpO2WieuQqeuLiOuLpC4uLmBcclxuICAgICk7XHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgICAgdGVzdENhc2VzLm1hcCgobGluZSkgPT4gdGhpcy5mb3JrUHJvY2VzcygoaGFuZGxlcikgPT4gaGFuZGxlcihsaW5lKSkpXHJcbiAgICApO1xyXG4gICAgYXdhaXQgYXN5bmNRdWVzdGlvbihcclxuICAgICAgXCLthYzsiqTtirgg7LyA7J207Iqk66W8IOqzhOyGjSDsp4TtlontlaDquYzsmpQ/IFtZLHkgLyBOLG5dICjquLDrs7ggWSlcIlxyXG4gICAgKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgaWYgKHJlcy50b1VwcGVyQ2FzZSgpID09IFwiTlwiKSB0aGlzLnRlc3RDYXNlTW9kZSA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHJ1bkNvZGUoKSB7XHJcbiAgICBhd2FpdCB0aGlzLmZvcmtQcm9jZXNzKChoYW5kbGVyKSA9PiBybEkub25jZShcImxpbmVcIiwgKHMpID0+IGhhbmRsZXIocykpKTtcclxuICAgIGF3YWl0IGFzeW5jUXVlc3Rpb24oXHJcbiAgICAgIFwi7JWE66y0IO2CpOulvCDriITrpbTshLjsmpQuLi4gKO2FjOyKpO2KuCDsvIDsnbTsiqQg6rOE7IaN7ZWY6riwOiBbVF0pXCJcclxuICAgICkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgIGlmIChyZXMudG9VcHBlckNhc2UoKSA9PSBcIlRcIikgdGhpcy50ZXN0Q2FzZU1vZGUgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBKdWRnZVRlc3RlcjtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUEwQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtDQUgxQjtBQUFBO0FBQUE7QUFLQSxJQUFNQSxHQUFHLEdBQUdDLG9CQUFFLENBQUNDLGVBQWUsQ0FBQ0MsT0FBTyxDQUFDQyxLQUFLLEVBQUVELE9BQU8sQ0FBQ0UsTUFBTSxDQUFDO0FBRTdELElBQU1DLGFBQWE7RUFBQSxzRUFBRyxpQkFBT0MsS0FBYTtJQUFBO01BQUE7UUFBQTtVQUFBLGlDQUN4QyxJQUFJQyxPQUFPLENBQVMsVUFBQ0MsR0FBRztZQUFBLE9BQUtULEdBQUcsQ0FBQ1UsUUFBUSxDQUFDSCxLQUFLLEVBQUVFLEdBQUcsQ0FBQztVQUFBLEVBQUM7UUFBQTtRQUFBO1VBQUE7TUFBQTtJQUFBO0VBQUE7RUFBQSxnQkFEbERILGFBQWE7SUFBQTtFQUFBO0FBQUEsR0FDcUM7QUFBQyxJQUVuREssV0FBVztFQUtmLHFCQUFZQyxRQUFnQixFQUFFQyxPQUE0QixFQUFFO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFDMUQsSUFBSSxDQUFDRCxRQUFRLEdBQUdBLFFBQVE7SUFDeEIsSUFBSSxDQUFDRSxZQUFZLEdBQ2ZELE9BQU8sQ0FBQ0UsUUFBUSxLQUFLLElBQUksSUFBSUYsT0FBTyxDQUFDRSxRQUFRLEtBQUtDLFNBQVMsR0FDdkQsZ0JBQWdCLEdBQ2hCSCxPQUFPLENBQUNFLFFBQVE7SUFDdEIsSUFBSSxDQUFDRSxZQUFZLEdBQUdKLE9BQU8sQ0FBQ0UsUUFBUSxLQUFLQyxTQUFTO0VBQ3BEO0VBQUM7SUFBQTtJQUFBLE9BRUQsaUJBQWU7TUFDYkUsT0FBTyxDQUFDQyxHQUFHLENBQ1QsMkJBQTJCLEVBQzNCLHFDQUFxQyxDQUN0QztNQUVELElB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