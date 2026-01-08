import MediaList from "components/media/MediaList";
import { Stack } from "expo-router";
import { useUpcomingNextSeasonAnime } from "hooks/useAnimeSearchQueries";
import React from "react";
import { View } from "react-native";
import { getCurrentSeason, getNextSeason } from "utils/date";

export default function NextSeasonScreen() {
	const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false);
	const pageRef = React.useRef(1);

	const { season: nextSeason, year: nextYear } = React.useMemo(() => {
		const current = getCurrentSeason();
		return getNextSeason(current.season, current.year);
	}, []);

	const { data, loading, fetchMore } = useUpcomingNextSeasonAnime({
		variables: { page: 1, perPage: 20, nextSeason, nextYear },
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

	const title = `Upcoming ${nextSeason} ${nextYear}`;

	return (
		<View className="flex-1 bg-black">
			<Stack.Screen options={{ title: title, headerBackTitle: "Back" }} />
			<MediaList
				data={data?.Page as any}
				loading={loading}
				onEndReached={onEndReached}
				isLoadingMore={fetchMoreLoading}
			/>
		</View>
	);
}
