declare class JudgeTester {
    private testCaseMode;
    private readonly testCasePath;
    private readonly codePath;
    constructor(codePath: string, options: Record<string, any>);
    start(): void;
    private runner;
    private forkProcess;
    private runTestCase;
    private runCode;
}
export default JudgeTester;
