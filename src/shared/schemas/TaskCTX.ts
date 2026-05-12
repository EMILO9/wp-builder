import type { ConfigOutput } from "@shared/schemas/ConfigSchema";
import type { DataType } from "@shared/schemas/DataSchema";

export type TaskCTX = {
	config: ConfigOutput;
	slug: string;
	buildRoot: string;
	stagingPath: string;
	context: ReturnType<DataType>;
};
