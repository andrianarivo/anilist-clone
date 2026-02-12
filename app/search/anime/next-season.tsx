import MediaList from "@features/search/anime/media-list";
import { useAnimeSearch } from "@hooks/search/anime/use-anime-search";
import { useMediaFilters } from "@hooks/search/anime/use-media-filters";
import React from "react";
import { View } from "react-native";
import { MediaSort } from "types/gql/graphql";
import { getCurrentSeason, getNextSeason } from "utils/date";

export default function NextSeasonScreen() {
	const { season: nextSeason, year: nextYear } = React.useMemo(() => {
		const current = getCurrentSeason();
		return getNextSeason(current.season, current.year);
	}, []);

	const { filters, setFilters } = useMediaFilters({
		season: nextSeason,
		year: nextYear,
	});

	const { data, loading, fetchMoreLoading, onEndReached } = useAnimeSearch({
		filters,
		defaultSort: [MediaSort.PopularityDesc, MediaSort.ScoreDesc],
	});

	return (
		<View className="flex-1">
			<MediaList
				data={data?.Page as any}
				loading={loading}
				onEndReached={onEndReached}
				isLoadingMore={fetchMoreLoading}
				title="Next Season"
				filters={filters}
				onFiltersChange={setFilters}
			/>
		</View>
	);
}
