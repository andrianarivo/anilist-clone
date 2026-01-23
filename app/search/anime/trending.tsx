import MediaList from "@features/search/anime/media-list";
import { useTrending } from "@hooks/search/anime/use-trending";
import { useMediaFilters } from "@hooks/search/anime/use-media-filters";
import React from "react";
import { View } from "react-native";

export default function TrendingScreen() {
	const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false);
	const { filters, setFilters } = useMediaFilters();
	const { data, loading, fetchMore } = useTrending({
		variables: { page: 1, perPage: 20 },
	});

	const pageRef = React.useRef(1);

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
		<View className="flex-1 bg-black">
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

