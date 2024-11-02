import { execSync } from "child_process";

execSync("npm i @actions/core");

import core from "@actions/core";
import * as tar from "tar";
import fs from "fs";

try {
  const cwd = core.getInput("cwd");
  const command = core.getInput("command", { required: true });
  const files = core
    .getInput("files", { required: true })
    .split("\n")
    .filter((file) => file.length > 0);
  const outPath = core.getInput("outPath");

  const fileList = Array.isArray(files) ? files : [files];

  switch (command) {
    case "compress": {
      if (!outPath) throw new Error("outPath is required");

      tar
        .c(
          {
            cwd,
            gzip: true,
            sync: true,
          },
          fileList
        )
        .pipe(fs.createWriteStream(outPath));
      break;
    }
    case "extract": {
      if (files.length !== 1)
        throw new Error("Only one file can be extracted at a time");

      tar.x({ C: cwd, sync: true, file: files[0] });
      break;
    }
    default:
      throw new Error(`Unknown command: ${command}`);
  }
} catch (error: unknown) {
  console.log(error);
  core.setFailed((error as Error).message);
}
