import { FlashList } from "@shopify/flash-list";
import Anime from "@components/anime";
import { MediaFragment } from "@hooks/search/anime/fragments";
import AnimeSkeleton from "@components/anime-skeleton";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type FragmentType, useFragment as getFragment } from "types/gql";

type Props = {
	data?: {
		media?: (FragmentType<typeof MediaFragment> | null | undefined)[] | null;
		pageInfo?: {
			hasNextPage?: boolean | null;
			total?: number | null;
			lastPage?: number | null;
		} | null;
	} | null;
	loading: boolean;
	onEndReached: () => void;
	isLoadingMore?: boolean;
	title?: string;
};

const MediaList = ({
	data,
	loading,
	onEndReached,
	isLoadingMore,
	title,
}: Props) => {
	const { top: topInset } = useSafeAreaInsets();
	const paddingTop = topInset || 0;

	if (loading && !data) {
		return (
			<View className="flex-1 bg-global-bg">
				<View style={{ paddingTop }}>
					{title && (
						<View className="px-4 py-4 pt-2">
							<Text className="text-3xl font-bold text-global-text">
								{title}
							</Text>
						</View>
					)}
					{["skeleton-1", "skeleton-2", "skeleton-3"].map((id) => (
						<AnimeSkeleton key={id} />
					))}
				</View>
			</View>
		);
	}

	const renderItem = ({
		item,
	}: {
		item: FragmentType<typeof MediaFragment> | null | undefined;
	}) => {
		if (!item) return null;
		const media = getFragment(MediaFragment, item);
		return (
			<Anime
				mediaId={media.id.toString()}
				uri={media.coverImage?.extraLarge || media.bannerImage || ""}
				ratings={media.averageScore || 0}
				nbUsers={media.popularity || 0}
				title={media.title?.userPreferred || ""}
				year={media.startDate?.year || 0}
				description={media.description || ""}
			/>
		);
	};

	return (
		<View className="flex-1 bg-global-bg">
			<FlashList<FragmentType<typeof MediaFragment> | null | undefined>
				data={data?.media || []}
				renderItem={renderItem}
				keyExtractor={(item: FragmentType<typeof MediaFragment> | null | undefined, index: number) => {
					if (!item) return index.toString();
					const media = getFragment(MediaFragment, item);
					return media.id.toString();
				}}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.5}
				contentContainerStyle={{
					paddingTop,
				}}
				ListHeaderComponent={
					title ? (
						<View className="px-4 py-4 pt-2">
							<Text className="text-3xl font-bold text-global-text">
								{title}
							</Text>
						</View>
					) : null
				}
				ListFooterComponent={
					isLoadingMore ? (
						<AnimeSkeleton />
					) : null
				}
			/>
		</View>
	);
};

export default MediaList;
