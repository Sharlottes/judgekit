import chalk from "chalk";
import Bundle from "./Bundle";

class Log {
  info(message?: any, ...params: any[]) {
    console.log(message, ...params);
  }
  error(message?: any, ...params: any[]) {
    console.error(
      chalk.red(`[${Bundle.current.global.error}!]`) + message,
      ...params
    );
  }
  warn(message?: any, ...params: any[]) {
    console.log(
      chalk.hex("ffa500")(`[${Bundle.current.global.warn}!]`) + message,
      ...params
    );
  }
}
export default new Log();
