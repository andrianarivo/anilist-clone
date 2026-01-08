import { MediaSeason } from "../types/gql/graphql";

export function getCurrentSeason(): { season: MediaSeason; year: number } {
	const date = new Date();
	const month = date.getMonth(); // 0-11
	const year = date.getFullYear();

	// AniList Seasons:
	// Winter: Jan - Mar (Months 0, 1, 2)
	// Spring: Apr - Jun (Months 3, 4, 5)
	// Summer: Jul - Sep (Months 6, 7, 8)
	// Fall: Oct - Dec (Months 9, 10, 11)

	if (month >= 0 && month <= 2) return { season: MediaSeason.Winter, year };
	if (month >= 3 && month <= 5) return { season: MediaSeason.Spring, year };
	if (month >= 6 && month <= 8) return { season: MediaSeason.Summer, year };
	return { season: MediaSeason.Fall, year };
}

export function getNextSeason(
	currentSeason: MediaSeason,
	currentYear: number,
): { season: MediaSeason; year: number } {
	switch (currentSeason) {
		case MediaSeason.Winter:
			return { season: MediaSeason.Spring, year: currentYear };
		case MediaSeason.Spring:
			return { season: MediaSeason.Summer, year: currentYear };
		case MediaSeason.Summer:
			return { season: MediaSeason.Fall, year: currentYear };
		case MediaSeason.Fall:
			return { season: MediaSeason.Winter, year: currentYear + 1 };
	}
}
