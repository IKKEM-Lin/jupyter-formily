import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { process } from 'process'

const args = process.argv;
const componentName = args[args.length - 1].split("=")[1];

console.log(componentName)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  mode: "production",
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.COMPONENT_NAME': `${componentName}`
  },
	build: {
		lib: {
			entry: ["src/main-widget"],
			formats: ["es"],
      fileName: componentName
		},
	},
})
