import Anime from "components/anime";
import CollectionView from "components/collection-view";
import NewRelease from "components/new-release";
import Watching from "components/watching";
import {
	useLazyAllMedia,
	useLazyMostPopular,
	useLazyWatching,
} from "hooks/useHomeQueries";
import { useEffect } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import type { CollectionType, Item, SectionData } from "types/home";

export default function Home() {
	const insets = useSafeAreaInsets();
	const [getMostPopular, mostPopular] = useLazyMostPopular();
	const [getAllMedia, allMedia] = useLazyAllMedia();
	const [getWatching, watching] = useLazyWatching();

	useEffect(() => {
		getMostPopular();
		getAllMedia();
		getWatching();
	}, [getAllMedia, getMostPopular, getWatching]);

	// Log errors individually for easier debugging
	useEffect(() => {
		if (mostPopular.error)
			console.error("Most Popular Query Error:", mostPopular.error);
		if (allMedia.error) console.error("All Media Query Error:", allMedia.error);
		if (watching.error) console.error("Watching Query Error:", watching.error);
	}, [mostPopular.error, allMedia.error, watching.error]);

	const isLoading = mostPopular.loading || allMedia.loading || watching.loading;
	const hasEssentialData = mostPopular.data?.MediaTrend && allMedia.data?.Page;

	if (!hasEssentialData && !isLoading) {
		return (
			<SafeAreaView className="flex-1">
				<ScrollView
					contentContainerStyle={{
						flex: 1,
					}}
					refreshControl={
						<RefreshControl
							onRefresh={() => {
								getMostPopular();
								getAllMedia();
								getWatching();
							}}
							refreshing={isLoading}
						/>
					}
				>
					<View className="flex-1 justify-center items-center">
						<Text className="text-white text-center px-4">
							{mostPopular.error || allMedia.error
								? "Error fetching essential data. Please pull down to refresh."
								: "No data found."}
						</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	if (hasEssentialData && mostPopular.data?.MediaTrend && allMedia.data?.Page) {
		const bannerItem = {
			mediaId: mostPopular.data.MediaTrend.media.id.toString(),
			title: mostPopular.data.MediaTrend.media.title.userPreferred,
			publisher:
				mostPopular.data.MediaTrend.media.studios.nodes.length > 0
					? (mostPopular.data.MediaTrend.media.studios.nodes[0]?.name ??
						"Unknown")
					: "Unknown",
			ratings: mostPopular.data.MediaTrend.averageScore,
			nbUsers: mostPopular.data.MediaTrend.popularity,
			coverUri: mostPopular.data.MediaTrend.media.bannerImage,
		};

		const ALL_MEDIAS = (allMedia.data.Page.mediaList || []).map((item) => {
			const media: Item = {
				key: item.media.id.toString(),
				nbUsers: item.media.popularity,
				description: item.media.description,
				rating: item.media.averageScore,
				title: item.media.title.userPreferred,
				uri: item.media.coverImage.extraLarge,
				year: item.media.startDate.year,
			};
			return media;
		});

		const WATCHING = (watching.data?.Page?.mediaList || []).map((item) => {
			const media: Item = {
				key: item.media.id.toString(),
				title: item.media.title.userPreferred,
				uri: item.media.coverImage.extraLarge,
				episode: item.progress.toString(),
				progress: item.media.episodes ? item.progress / item.media.episodes : 0,
			};
			return media;
		});

		const SECTIONS: ReadonlyArray<SectionData> = [
			...(WATCHING.length > 0
				? [
						{
							title: "Continue watching",
							watching: true,
							type: "horizontal" as CollectionType,
							data: WATCHING,
						},
					]
				: []),
			{
				title: "All",
				watching: false,
				type: "grid" as CollectionType,
				data: ALL_MEDIAS,
			},
		];

		return (
			<CollectionView
				contentContainerStyle={{
					paddingTop: insets.top,
				}}
				onRefresh={() => {
					getMostPopular();
					getAllMedia();
					getWatching();
				}}
				refreshing={isLoading}
				ListHeaderComponent={
					<View>
						<Text className="ml-4 text-md text-white font-regular my-4">
							Most popular.
						</Text>
						<NewRelease
							className="mx-4"
							mediaId={bannerItem.mediaId}
							title={bannerItem.title}
							publisher={bannerItem.publisher}
							ratings={bannerItem.ratings}
							nbUsers={bannerItem.nbUsers}
							coverUri={bannerItem.coverUri}
						/>
					</View>
				}
				sections={SECTIONS}
				renderSectionHeader={({ section }) => {
					return section.watching ? (
						<Text className="ml-4 text-md text-white font-regular my-4">
							{section.title}
						</Text>
					) : (
						<View className="flex-row justify-between items-center w-3/4">
							<Text className="ml-4 text-md text-white font-bold my-4">
								• For you
							</Text>
							<Text className="ml-4 text-md text-neutral500 my-4">Popular</Text>
							<Text className="ml-4 text-md text-neutral500 my-4">Popular</Text>
							<Text className="ml-4 text-md text-neutral500 my-4">Popular</Text>
						</View>
					);
				}}
				renderElement={({ section, item }) => {
					return section.watching ? (
						<Watching
							mediaId={item.key}
							season={item.season}
							title={item.title}
							episode={item.episode}
							progress={item.progress}
							uri={item.uri}
						/>
					) : (
						<Anime
							mediaId={item.key}
							nbUsers={item.nbUsers ?? 0}
							description={item.description ?? ""}
							ratings={item.rating ?? 0}
							uri={item.uri}
							title={item.title}
							year={item.year ?? 0}
						/>
					);
				}}
			/>
		);
	}

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1 justify-center items-center">
				<Text className="text-white">Loading</Text>
			</View>
		</SafeAreaView>
	);
}
