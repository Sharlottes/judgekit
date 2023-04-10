import fs from "fs";
import path from "path";
import inquirer from "inquirer";

import Config from "./Config";
import Strings from "../utils/Strings";
import Bundle from "./Bundle";

interface PathFinderOptions {
  isFile?: boolean;
  excludePath?: (path: string) => boolean;
}
class PathFinder {
  public static find(
    relativePath: string,
    relatedTo: "PWD" | "Judgekit",
    { isFile = true, excludePath = () => false }: PathFinderOptions = {}
  ) {
    const rootPath =
      relatedTo === "PWD" ? Config.terminalPath : Config.projectPath;
    const resolvedPath = path.resolve(rootPath, relativePath);

    if (fs.existsSync(resolvedPath)) return resolvedPath;
    else
      return Promise.resolve(
        inquirer.prompt<{ path: string }>([
          {
            type: "fuzzypath",
            name: "path",
            itemType: isFile ? "file" : "directory",
            rootPath,
            suggestOnly: true,
            excludePath: (path: string) => excludePath(path),
            message: Strings.format(
              Bundle.current.global.pathfinder.path_notfound,
              relativePath
            ),
          },
        ])
      ).then((o) => o.path);
  }
}

export default PathFinder;
