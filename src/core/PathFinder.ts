import fs from "fs";
import path from "path";
import inquirer, { type QuestionCollection } from "inquirer";

import Config from "./Config";
import Strings from "../utils/Strings";
import Bundle from "./Bundle";
import Log from "./Log";

class PathFinder {
  public static async find(
    relativePath: string,
    relatedTo?: "PWD" | "Judgekit" | undefined,
    options: Omit<
      QuestionCollection,
      "type" | "name" | "message" | "rootPath"
    > = {}
  ) {
    if (relatedTo) {
      const rootPath =
        relatedTo === "PWD" ? Config.terminalPath : Config.projectPath;
      const resolvedPath = path.resolve(rootPath, relativePath);

      if (fs.existsSync(resolvedPath)) return resolvedPath;
    }

    Log.warn(
      Strings.format(
        Bundle.current.global.pathfinder.path_notfound,
        relativePath
      )
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
            relativePath
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
