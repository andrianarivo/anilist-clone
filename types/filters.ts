import type { MediaFormat, MediaSeason, MediaStatus } from "./gql/graphql";

export type MediaFilters = {
	search?: string;
	genres?: string[];
	year?: number;
	season?: MediaSeason;
	format?: MediaFormat;
	status?: MediaStatus;
};

export const AVAILABLE_GENRES = [
	"Action",
	"Adventure",
	"Comedy",
	"Drama",
	"Ecchi",
	"Fantasy",
	"Horror",
	"Mahou Shoujo",
	"Mecha",
	"Music",
	"Mystery",
	"Psychological",
	"Romance",
	"Sci-Fi",
	"Slice of Life",
	"Sports",
	"Supernatural",
	"Thriller",
] as const;

export const YEAR_OPTIONS = Array.from(
	{ length: new Date().getFullYear() - 1939 + 2 },
	(_, i) => new Date().getFullYear() + 1 - i,
);
