import { MediaFormat, MediaSeason, MediaSort, MediaStatus } from "./gql/graphql";

export type MediaFilters = {
	search?: string;
	genres?: string[];
	year?: number;
	season?: MediaSeason;
	format?: MediaFormat;
	status?: MediaStatus;
	sort?: MediaSort[];
};

export const FORMAT_OPTIONS = [
	MediaFormat.Tv,
	MediaFormat.TvShort,
	MediaFormat.Movie,
	MediaFormat.Special,
	MediaFormat.Ova,
	MediaFormat.Ona,
	MediaFormat.Music,
];

export const SEASON_OPTIONS = [
	MediaSeason.Winter,
	MediaSeason.Spring,
	MediaSeason.Summer,
	MediaSeason.Fall,
];

export const STATUS_OPTIONS = [
	MediaStatus.Releasing,
	MediaStatus.Finished,
	MediaStatus.NotYetReleased,
	MediaStatus.Cancelled,
	MediaStatus.Hiatus,
];

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
