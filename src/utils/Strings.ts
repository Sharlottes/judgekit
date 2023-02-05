export default class Strings {
  public static format(string: string, ...args: any[]) {
    args.forEach((a, i) => {
      string = string.replaceAll(`{${i}}`, a);
    });
    return string;
  }
}
