import chalk from "chalk";
import Bundle from "./assets/bundles/Bundle";

class Log {
  info(message?: any, ...params: any[]) {
    console.log(message, ...params);
  }
  error(message?: any, ...params: any[]) {
    console.error(chalk.red(`[${Bundle.global.error}!]`) + message, ...params);
  }
  warn(message?: any, ...params: any[]) {
    console.log(
      chalk.hex("ffa500")(`[${Bundle.global.warn}!]`) + message,
      ...params
    );
  }
}
export default new Log();
