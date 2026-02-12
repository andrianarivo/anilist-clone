import MediaList from "@features/search/anime/media-list";
import { useAnimeSearch } from "@hooks/search/anime/use-anime-search";
import { useMediaFilters } from "@hooks/search/anime/use-media-filters";
import { View } from "react-native";
import { MediaSort } from "types/gql/graphql";

export default function TrendingScreen() {
	const { filters, setFilters } = useMediaFilters();
	const { data, loading, fetchMoreLoading, onEndReached } = useAnimeSearch({
		filters,
		defaultSort: [MediaSort.TrendingDesc],
	});

	return (
		<View className="flex-1">
			<MediaList
				data={data?.Page as any}
				loading={loading}
				onEndReached={onEndReached}
				isLoadingMore={fetchMoreLoading}
				title="Trending Now"
				filters={filters}
				onFiltersChange={setFilters}
			/>
		</View>
	);
}
