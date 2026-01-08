import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: process.env.EXPO_PUBLIC_ANILIST_API_URL,
	documents: ["app/**/*.tsx", "hooks/**/*.ts", "components/**/*.tsx"],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		"types/gql/": {
			preset: "client",
			plugins: [],
		},
	},
};

export default config;
