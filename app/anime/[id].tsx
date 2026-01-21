import { useLazyQuery } from "@apollo/client/react";
import ZoomableImage from "@components/zoomable-image";
import { Ionicons } from "@expo/vector-icons";
import { default as Character } from "components/character";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	Modal,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	useWindowDimensions,
	View,
	type ViewProps,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import HTML from "react-native-render-html";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { graphql } from "types/gql";

type AnimeDetailsProps = ViewProps;

type AnimeCharacter = {
	id: string;
	name: string;
	gender: string;
	imageUri: string;
};

const useLazyAnimeDetails = () => {
	const QUERY = graphql(`
    query GetMedia($id: Int) {
      Media(id: $id) {
        id
        studios(isMain: true) {
          nodes {
            name
          }
        }
        coverImage {
          extraLarge
        }
        startDate{
          year
        }
        popularity
        averageScore
        description(asHtml: true)
        title {
          userPreferred
        }
        characters(role: MAIN) {
          nodes {
            id
            name {
              userPreferred
            }
            gender
            image {
              medium
            }
          }
        }
      }
    }
  `);
	return useLazyQuery(QUERY);
};

const AnimeDetails = ({ ...props }: AnimeDetailsProps) => {
	const _router = useRouter();
	const { id, imgSource } = useLocalSearchParams<{
		id: string;
		imgSource: string;
	}>();
	const mediaId = id;
	const [getAnimeDetails, animeDetails] = useLazyAnimeDetails();
	const { width, height } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		if (mediaId) {
			getAnimeDetails({ variables: { id: Number(mediaId) } });
		}
	}, [getAnimeDetails, mediaId]);

	if (animeDetails.error) {
		return (
			<SafeAreaView className="flex-1 bg-global-bg">
				<StatusBar style="light" />
				<ScrollView
					contentContainerStyle={{
						flex: 1,
					}}
					refreshControl={
						<RefreshControl
							tintColor={"white"}
							onRefresh={() => {
								getAnimeDetails({ variables: { id: Number(mediaId) } });
							}}
							refreshing={animeDetails.loading}
						/>
					}
				>
					<View className="flex-1 justify-center items-center">
						<Text className="text-white">Error fetching data</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		);
	}

	if (animeDetails.data?.Media) {
		const characters: AnimeCharacter[] = [];
		const nodes = animeDetails.data.Media.characters?.nodes ?? [];

		for (const node of nodes) {
			if (node) {
				characters.push({
					id: String(node.id),
					name: node.name?.userPreferred ?? "Unknown",
					gender: node.gender ?? "Unknown",
					imageUri: node.image?.medium ?? "",
				});
			}
		}

		const animeDetailsData = {
			studio: animeDetails.data.Media.studios?.nodes?.[0]?.name ?? "Unknown",
			title: animeDetails.data.Media.title?.userPreferred ?? "Unknown",
			description: animeDetails.data.Media.description ?? "",
			year: animeDetails.data.Media.startDate?.year ?? 0,
			score: Array.from(
				{
					length: Math.round((animeDetails.data.Media.averageScore || 0) / 20),
				},
				(_, i) => i,
			),
			characters: characters,
			popularity: animeDetails.data.Media.popularity,
			coverImage: animeDetails.data.Media.coverImage?.extraLarge,
		};

		return (
			<View {...props} className="flex-1 bg-global-bg">
				<StatusBar style="light" />
				<Modal
					visible={modalVisible}
					transparent={true}
					animationType="fade"
					onRequestClose={() => setModalVisible(false)}
				>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<View className="flex-1 bg-black justify-center items-center relative">
							<TouchableOpacity
								onPress={() => setModalVisible(false)}
								className="absolute top-12 right-4 z-10 p-2 bg-black/50 rounded-full"
							>
								<Ionicons name="close" size={30} color="white" />
							</TouchableOpacity>
							<ZoomableImage
								uri={animeDetailsData.coverImage ?? imgSource}
								style={{ width: width, height: height }}
								contentFit="contain"
							/>
						</View>
					</GestureHandlerRootView>
				</Modal>
				<FlatList
					ListHeaderComponent={() => {
						return (
							<View>
								<View className="relative">
									<TouchableOpacity
										onPress={() => {
											setModalVisible(true);
										}}
										activeOpacity={0.9}
									>
										<Animated.Image
											className="w-full h-[374]"
											resizeMode="cover"
											source={{
												uri: imgSource,
											}}
										/>
										<View className="absolute top-1/2 left-1/2 -translate-x-4 -translate-y-4 bg-black/30 rounded-full p-2">
											<Ionicons name="expand-outline" size={24} color="white" />
										</View>
									</TouchableOpacity>
									<LinearGradient
										className="w-full h-20 absolute bottom-0 left-0"
										colors={["transparent", "#152232"]}
									/>
								</View>
								<View className="flex-row justify-between items-center mx-3">
									<View className="flex-row items-center">
										<View>
											<Text className="text-white text-2xl font-bold max-w-[98%] mr-1">
												{animeDetailsData.title}
											</Text>
											<View className="flex-row items-center">
												<Text className="text-neutral500 text-sm font-regular">
													{animeDetailsData.studio}
												</Text>
												<Text className="text-neutral500 text-xs font-regular">
													{" "}
													•{" "}
												</Text>
												<Text className="text-neutral500 text-xs font-regular">
													{animeDetailsData.year}
												</Text>
											</View>
										</View>
									</View>
									<View>
										<View className="flex-row-reverse">
											{animeDetailsData.score.map((item) => {
												return (
													<Ionicons
														key={`star-${item}`}
														name="star"
														size={14}
														color="#E7C825"
														className="mx-[2] my-[5]"
													/>
												);
											})}
										</View>
										<Text className="text-neutral500 text-xs">
											From {animeDetailsData.popularity} users
										</Text>
									</View>
								</View>
								<View className="text-neutral500 text-sm m-5">
									<HTML
										tagsStyles={{
											p: {
												fontFamily: "Roboto_400Regular",
												color: "#978F8A",
											},
										}}
										contentWidth={width}
										source={{ html: animeDetailsData.description }}
									/>
								</View>
							</View>
						);
					}}
					ItemSeparatorComponent={() => {
						return <View className="h-2" />;
					}}
					contentContainerStyle={{
						alignItems: "center",
						paddingBottom: insets.bottom + 20,
					}}
					numColumns={2}
					data={animeDetailsData.characters}
					renderItem={({ item }) => {
						return (
							<Character
								key={item.id}
								id={item.id}
								name={item.name}
								gender={item.gender}
								imageUri={item.imageUri}
							/>
						);
					}}
					ListFooterComponent={() => {
						return (
							<View className="h-[110]  justify-center align-center">
								<View className="h-[52] w-[211]">
									<LinearGradient
										className="p-[2] rounded-full"
										colors={["#19A1BE", "#7D4192"]}
										start={[0, 1]}
										end={[1, 1]}
										style={{ flex: 1 }}
									>
										<View className="flex-1 relative bg-neutral800 rounded-full justify-center align-center">
											<Animated.Image
												className="absolute left-[-25%]"
												source={require("assets/images/button_bg.png")}
											/>
											<TouchableOpacity
												onPress={() => {
													console.log("touch");
												}}
											>
												<Text className="text-white font-bold text-base text-center">
													Watch trailer
												</Text>
											</TouchableOpacity>
										</View>
									</LinearGradient>
								</View>
							</View>
						);
					}}
				/>
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-global-bg">
			<StatusBar style="light" />
			<Animated.Image
				className="h-[374]"
				resizeMode="cover"
				source={{
					uri: imgSource,
				}}
			/>
			<View className="flex-1 justify-center items-center">
				<Text className="text-white">Loading</Text>
			</View>
		</SafeAreaView>
	);
};

export default AnimeDetails;
