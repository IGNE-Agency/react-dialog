import react from "@vitejs/plugin-react";
import { glob } from "glob";
import * as Path from "node:path";
import * as NodeUrl from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({ include: ["lib"] }),
		libInjectCss()
	],
	server: {
		open: true
	},
	build: {
		copyPublicDir: false,
		rollupOptions: {
			external: [
				"classnames",
				"react",
				"react-dom",
				"react/jsx-runtime"
			],
			input: Object.fromEntries(
				glob
					.sync("lib/**/*.{ts,tsx}", {
						ignore: ["lib/**/*.d.ts"]
					})
					.map((file: string) => [
						Path.relative(
							"lib",
							file.slice(
								0,
								file.length - Path.extname(file).length
							)
						),
						NodeUrl.fileURLToPath(
							new URL(file, import.meta.url)
						)
					])
			),
			output: {
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "[name].js"
			}
		},
		lib: {
			entry: Path.resolve(__dirname, "lib/main.ts"),
			formats: ["es"]
		}
	}
});
