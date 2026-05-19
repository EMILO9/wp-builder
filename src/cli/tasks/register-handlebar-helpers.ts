import type { ListrTask } from "listr2";
import Handlebars from "handlebars";
import type { TaskCTX } from "@shared/schemas/TaskCTX";

export function register_handlebar_helpers(): ListrTask<TaskCTX> {
  return {
    title: "Register handlebar helpers",
    task: (ctx, task) => {
      const { config } = ctx;
      const entries = Object.entries(config.php.helpers);
      if (!entries.length) {
        task.skip("No custom template helpers specified");
        return;
      }
      for (const [name, fn] of entries) {
        Handlebars.registerHelper(name, fn);
      }
    },
  };
}
