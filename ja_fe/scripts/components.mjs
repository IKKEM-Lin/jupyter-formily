import {readdirSync} from "fs"
import {resolve} from "path"

const __dirname = resolve()
function readComponents(folder) {
  const files = readdirSync(folder);
  return files.filter(file => file.endsWith(".tsx") && file.match(/^[A-Z]/)).map(file => file.replace(".tsx", ""));
}

export const components = readComponents(resolve(__dirname, 'src', 'component'));
