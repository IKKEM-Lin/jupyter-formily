import { argv, exit } from "process";
import { spawn } from "child_process";
import { components } from "./components.mjs";

// console.log(components)
const name = argv[argv.length - 1];
if (!components.includes(name)) {
  console.error(
    `Error:  ${name} not in "src/component". Please add component name on last (\n eg: npm run dev Formily\n)`
  );
  exit();
}

const child = spawn(
  `tsc && vite build -c vite-prod.config.js -w --mode=${name}`,
  {
    shell: true,
    stdio: "inherit",
  }
);

child.on("error", (error) => {
  console.error(`Error: ${error}`);
});

child.on("close", (code) => {
  console.log(`Exit, code: ${code}`);
});
