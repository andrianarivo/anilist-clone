import MediaList from "@features/search/anime/media-list";
import { useAnimeSearch } from "@hooks/search/anime/use-anime-search";
import { useMediaFilters } from "@hooks/search/anime/use-media-filters";
import React from "react";
import { View } from "react-native";
import { MediaSort } from "types/gql/graphql";
import { getCurrentSeason } from "utils/date";

export default function ThisSeasonScreen() {
	const { season, year } = React.useMemo(() => getCurrentSeason(), []);

	const { filters, setFilters } = useMediaFilters({
		season,
		year,
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
				title="This Season"
				filters={filters}
				onFiltersChange={setFilters}
			/>
		</View>
	);
}
