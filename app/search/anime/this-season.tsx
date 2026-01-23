import MediaList from "@features/search/anime/media-list";
import { usePopularSeason } from "@hooks/search/anime/use-popular-season";
import { useMediaFilters } from "@hooks/search/anime/use-media-filters";
import React from "react";
import { View } from "react-native";
import { getCurrentSeason } from "utils/date";

export default function ThisSeasonScreen() {
	const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false);
	const pageRef = React.useRef(1);
	const { season, year } = React.useMemo(() => getCurrentSeason(), []);
	const { filters, setFilters } = useMediaFilters();

	const { data, loading, fetchMore } = usePopularSeason({
		variables: { page: 1, perPage: 20, season, seasonYear: year },
	});

	const onEndReached = async () => {
		if (!data?.Page?.pageInfo?.hasNextPage || loading || fetchMoreLoading)
			return;

		setFetchMoreLoading(true);
		const nextPage = pageRef.current + 1;

		try {
			await fetchMore({
				variables: { page: nextPage },
				updateQuery: (previousResult, { fetchMoreResult }) => {
					if (!fetchMoreResult) return previousResult;
					pageRef.current = nextPage;
					return {
						...previousResult,
						Page: {
							...previousResult.Page,
							pageInfo: fetchMoreResult.Page?.pageInfo,
							media: [
								...(previousResult.Page?.media || []),
								...(fetchMoreResult.Page?.media || []),
							],
						},
					};
				},
			});
		} catch (e) {
			console.error(e);
		} finally {
			setFetchMoreLoading(false);
		}
	};

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

