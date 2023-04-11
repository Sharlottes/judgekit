import fs from "fs";
import path from "path";
import inquirer, { type QuestionCollection } from "inquirer";

import Config from "./Config";
import Strings from "../utils/Strings";
import Bundle from "./Bundle";

class PathFinder {
  public static find(
    relativePath: string,
    relatedTo: "PWD" | "Judgekit",
    options: Omit<
      QuestionCollection,
      "type" | "name" | "message" | "rootPath"
    > = {}
  ) {
    const rootPath =
      relatedTo === "PWD" ? Config.terminalPath : Config.projectPath;
    const resolvedPath = path.resolve(rootPath, relativePath);

    if (fs.existsSync(resolvedPath)) return resolvedPath;
    else
      return inquirer
        .prompt<{ path: string }>([
          {
            type: "fuzzypath",
            name: "path",
            rootPath,
            message: Strings.format(
              Bundle.current.global.pathfinder.path_notfound,
              relativePath
            ),
            ...options,
          },
        ])
        .then((o) => o.path);
  }
}

export default PathFinder;
