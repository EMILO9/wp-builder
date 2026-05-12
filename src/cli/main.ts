import pkg from "@pkg";
import parsePackageJsonName from "parse-packagejson-name";
import { Command } from "commander";
import { consola } from "consola";
import { Listr } from "listr2";
import { fromError, isZodErrorLike } from "zod-validation-error";
import { discover_and_validate_config } from "@cli/tasks/config-discovery-and-validation";
import { prepare_runtime_context } from "@cli/tasks/prepare-runtime-context";
import { delete_plugin_directory } from "@cli/tasks/delete-plugin-directory";
import { register_handlebar_helpers } from "@cli/tasks/register-handlebar-helpers";
import { register_handlebar_partials } from "@cli/tasks/register-handlebar-partials";
import { render_php_entry_template } from "@cli/tasks/render-php-entry-template";
import { render_php_source_templates } from "@cli/tasks/render-php-source-templates";
import { bundle_assets_with_vite } from "@cli/tasks/bundle-assets-with-vite";
import { package_plugin_archive } from "@cli/tasks/package-plugin-archive";

const moduleName = parsePackageJsonName(pkg.name).fullName;

const program = new Command();

program.name(moduleName).description(pkg.description).version(pkg.version);

program
	.command("build")
	.description("Build the project")
	.action(async () => {
		try {
			consola.box(`${moduleName} v${pkg.version}`);
			const tasks = new Listr(
				[
					discover_and_validate_config(moduleName),
					prepare_runtime_context(),
					delete_plugin_directory(),
					register_handlebar_helpers(),
					register_handlebar_partials(),
					render_php_entry_template(),
					render_php_source_templates(),
					bundle_assets_with_vite(),
					package_plugin_archive(),
				],
				{
					renderer: "default",
					rendererOptions: { showErrorMessage: false },
				},
			);
			await tasks.run();
		} catch (error) {
			const message = isZodErrorLike(error)
				? fromError(error).toString()
				: error instanceof Error
					? error.message
					: String(error);
			consola.error(message);
			process.exit(1);
		}
	});

await program.parseAsync();
