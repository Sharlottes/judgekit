import fs from "fs";
import inquirer, { type QuestionCollection } from "inquirer";

import Config from "./Config";
import Strings from "../utils/Strings";
import Bundle from "./Bundle";
import Log from "./Log";

class PathFinder {
  public static async find(
    path: string,
    name: string,
    relatedTo?: "PWD" | "Judgekit" | undefined,
    options: Omit<
      QuestionCollection,
      "type" | "name" | "message" | "rootPath"
    > = {}
  ) {
    if (fs.existsSync(path)) return path;

    Log.warn(
      Strings.format(Bundle.current.global.pathfinder.path_notfound, name)
    );
    relatedTo ??= await inquirer
      .prompt<{
        rootPath: "Pring Working Directory" | "Judegekit Local";
      }>([
        {
          type: "list",
          name: "path",
          choices: ["Pring Working Directory", "Judegekit Local"],
          message: Strings.format(
            Bundle.current.global.pathfinder.rootpath_choice,
            name
          ),
        },
      ])
      .then((o) =>
        o.rootPath === "Pring Working Directory" ? "PWD" : "Judgekit"
      );
    const rootPath =
      relatedTo === "PWD" ? Config.terminalPath : Config.projectPath;

    return await inquirer
      .prompt<{ path: string }>([
        {
          type: "fuzzypath",
          name: "path",
          rootPath,
          message: Bundle.current.global.pathfinder.select_path,
          ...options,
        },
      ])
      .then((o) => o.path);
  }
}

export default PathFinder;
