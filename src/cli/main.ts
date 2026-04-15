import { cosmiconfig } from "cosmiconfig";
import { TypeScriptLoader } from "cosmiconfig-typescript-loader";
import pkg from "@pkg";
import parsePackageJsonName from "parse-packagejson-name";
import { Command } from "commander";
import { ConfigSchema } from "@shared/schemas/ConfigSchema";
import { build } from "vite";

const moduleName = parsePackageJsonName(pkg.name).fullName;
const explorer = cosmiconfig(moduleName, {
	loaders: {
		".ts": TypeScriptLoader(),
	},
});

const program = new Command();

program.name(moduleName).description(pkg.description).version(pkg.version);

program
	.command("build")
	.description("Build the project")
	.action(async () => {
		const result = await explorer.search();
		const config = ConfigSchema.parse(result?.config);
		if (config.build) {
			await build({});
		}
	});

program.parse();
