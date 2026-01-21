import MediaList from "@features/search/anime/media-list";
import { useTrending } from "@hooks/search/anime/use-trending";
import React from "react";
import { View } from "react-native";

export default function TrendingScreen() {
	const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false);
	const { data, loading, fetchMore } = useTrending({
		variables: { page: 1, perPage: 20 },
	});

	/* Removed unused handleLoadMore */

	// Actually, I made a mistake in the fragment, I didn't include currentPage.
	// However, I can maintain a ref or state for the page number.
	// Or better, let's look at how to merge the data.
	// With Apollo's fetchMore, we typically pass the new variables.
	// I will add currentPage to the fragment to be sure? No, I can't change it easily without regeneration.

	// Let's implement a simple page counter in state since I know I start at 1.
	// Actually, checking data.Page?.media length is strictly correct but page number is safer.

	// Let's rely on data length validation? No.
	// Let's use a ref for the current page since we are incrementing.
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
					pageRef.current = nextPage; // Update only on success
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
			/>
		</View>
	);
}
