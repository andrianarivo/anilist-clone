import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View, type ViewProps } from "react-native";
import Animated from "react-native-reanimated";

import { ROUTES } from "@/constants/routes";
import Rating from "./rating";

type Props = ViewProps & {
	uri: string;
	mediaId: string;
	ratings: number;
	description: string;
	nbUsers: number;
	title: string;
	year: number;
};

const Anime = ({
	mediaId,
	uri,
	ratings,
	title,
	year,
	nbUsers,
	description,
	...props
}: Props) => {
	const router = useRouter();
	useEffect(() => {}, []);

	const anime = {
		mediaId: mediaId,
		imgSource: uri,
	};

	return (
		<TouchableOpacity
			onPress={() =>
				router.push({
					pathname: ROUTES.DYNAMIC.ANIME_DETAILS(mediaId),
					params: { imgSource: uri },
				})
			}
		>
			<View
				{...props}
				className="m-2 bg-deep-dark p-4 rounded-lg overflow-hidden flex-row items-center"
			>
				<View className="overflow-hidden rounded-2xl mr-2 shadow-lg w-[124] h-[194]">
					<Animated.Image
						sharedTransitionTag={`image_${anime.mediaId}`}
						className="w-full h-full"
						source={{ uri: uri }}
					/>
				</View>
				<View className="flex-1 flex-grow">
					<Text className="font-bold text-md text-white flex-wrap">
						{title}
					</Text>
					<Text className="font-regular text-xs text-neutral500">{year}</Text>
					<Text
						className="font-regular text-xs text-white flex-1 flex-wrap"
						numberOfLines={7}
					>
						{description}
					</Text>
					<Rating count={ratings} nbUsers={nbUsers} />
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Anime;
