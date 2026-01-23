import { useRef, useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import Anime from "@components/anime";
import { MediaDataFragmentDoc } from "types/gql/graphql";
import AnimeSkeleton from "@components/anime-skeleton";
import { Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { type FragmentType, useFragment as getFragment } from "types/gql";
import type BottomSheet from "@gorhom/bottom-sheet";
import FilterBottomSheet from "@components/filter-bottom-sheet";
import type { MediaFilters } from "types/filters";
import { Ionicons } from "@expo/vector-icons";

type Props = {
	data?: {
		media?: (FragmentType<typeof MediaDataFragmentDoc> | null | undefined)[] | null;
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
	filters?: MediaFilters;
	onFiltersChange?: (filters: MediaFilters) => void;
};

const MediaList = ({
	data,
	loading,
	onEndReached,
	isLoadingMore,
	title,
	filters = {},
	onFiltersChange,
}: Props) => {
	const { top: topInset } = useSafeAreaInsets();
	const paddingTop = topInset || 0;
	const bottomSheetRef = useRef<BottomSheet>(null);

	const openFilters = useCallback(() => {
		bottomSheetRef.current?.expand();
	}, []);

	const closeFilters = useCallback(() => {
		bottomSheetRef.current?.close();
	}, []);

	const handleApply = useCallback(() => {
		closeFilters();
	}, [closeFilters]);

	const handleReset = useCallback(() => {
		onFiltersChange?.({});
	}, [onFiltersChange]);

	const handleFiltersChange = useCallback(
		(newFilters: MediaFilters) => {
			onFiltersChange?.(newFilters);
		},
		[onFiltersChange],
	);

	// Check if any filters are active
	const hasActiveFilters = Object.values(filters).some((value) => {
		if (Array.isArray(value)) return value.length > 0;
		return value !== undefined && value !== "";
	});

	if (loading && !data) {
		return (
			<View className="flex-1 bg-global-bg">
				<View style={{ paddingTop }}>
					{title && (
						<View className="px-4 py-4 pt-2 flex-row justify-between items-center">
							<Text className="text-3xl font-bold text-global-text">
								{title}
							</Text>
							{onFiltersChange && (
								<Pressable
									onPress={openFilters}
									className="p-2 flex-row items-center gap-2 rounded-lg bg-card-bg"
								>
									<Ionicons name="filter" />
									<Text className="text-global-text text-lg">
										Filter
									</Text>
								</Pressable>
							)}
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
		item: FragmentType<typeof MediaDataFragmentDoc> | null | undefined;
	}) => {
		if (!item) return null;
		const media = getFragment(MediaDataFragmentDoc, item);
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
			<FlashList<FragmentType<typeof MediaDataFragmentDoc> | null | undefined>
				data={data?.media || []}
				renderItem={renderItem}
				keyExtractor={(item: FragmentType<typeof MediaDataFragmentDoc> | null | undefined, index: number) => {
					if (!item) return index.toString();
					const media = getFragment(MediaDataFragmentDoc, item);
					return media.id.toString();
				}}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.5}
				contentContainerStyle={{
					paddingTop,
				}}
				ListHeaderComponent={
					title ? (
						<View className="px-4 py-4 pt-2 flex-row justify-between items-center">
							<Text className="text-3xl font-bold text-global-text">
								{title}
							</Text>
							{onFiltersChange && (
								<Pressable
									onPress={openFilters}
									className={`p-2 flex-row items-center gap-2 rounded-lg ${hasActiveFilters ? "bg-primary" : "bg-card-bg"}`}
								>
									<Ionicons name="filter" />
									<Text className="text-global-text text-lg">
										Filter
									</Text>
								</Pressable>
							)}
						</View>
					) : null
				}
				ListFooterComponent={
					isLoadingMore ? (
						<AnimeSkeleton />
					) : null
				}
			/>

			{onFiltersChange && (
				<FilterBottomSheet
					ref={bottomSheetRef}
					filters={filters}
					onFiltersChange={handleFiltersChange}
					onApply={handleApply}
					onReset={handleReset}
				/>
			)}
		</View>
	);
};

export default MediaList;
