import * as esbuild from "esbuild";

esbuild.build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  target: ["node18"],
  format: "cjs",
  external: ["@actions/core", "tar", "fs"],
  minify: true,
});
