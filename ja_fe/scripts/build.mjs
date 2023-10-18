import { spawn } from "child_process";
import {components} from "./components.mjs"
import {rmdirSync} from "fs"
import {resolve} from "path"
const __dirname = resolve()

const outputDir = resolve(__dirname, 'dist');

rmdirSync(outputDir, { recursive: true })

const script =
  `tsc && ` +
  components
    .map((name) => `vite build -c vite-prod.config.js --mode=${name}`)
    .join(" && ");

    
const child = spawn(
  script,
  {
    shell: true,
    stdio: "inherit",
  }
);

child.on("error", (error) => {
  console.error(`错误: ${error}`);
});

child.on("close", () => {
  console.log(`Done`);
});

