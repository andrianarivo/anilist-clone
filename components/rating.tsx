import { Ionicons } from "@expo/vector-icons";
import { Text, View, type ViewProps } from "react-native";

type Props = ViewProps & {
	count: number;
	nbUsers?: number;
};
const defaults: Props = {
	count: 3,
	nbUsers: 342,
};

const Rating = ({ count, nbUsers, ...props } = defaults) => {
	const rating = count / 20;

	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			let iconName: "star" | "star-half" | "star-outline" = "star";
			if (i > rating) {
				if (i - rating <= 0.5) {
					iconName = "star-half";
				} else {
					iconName = "star-outline";
				}
			}
			stars.push(
				<Ionicons
					key={i}
					name={iconName}
					size={14}
					color="#E7C825"
					className="mx-[1]"
				/>,
			);
		}
		return stars;
	};

	return (
		<View {...props} className="items-end">
			<View className="flex-row items-center bg-white px-2 py-1 rounded-full">
				<Text className="font-bold text-xs text-deep-dark mr-1">
					{rating.toFixed(1)}/5
				</Text>
				<View className="flex-row">{renderStars()}</View>
			</View>
			{nbUsers && (
				<View className="flex-row">
					<Text className="text-xs text-white">Listed by </Text>
					<Text className="text-xs font-bold text-white">{nbUsers}</Text>
					<Text className="text-xs text-white"> users</Text>
				</View>
			)}
		</View>
	);
};

export default Rating;
