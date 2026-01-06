import { Image, Text, View } from "react-native";

interface DataItem {
	key: string;
	text: string;
	uri: string;
}

const ListItem = (item: DataItem) => {
	return (
		<View className="p-2 items-center">
			<Image
				className="w-60 h-60"
				source={{
					uri: item.uri,
				}}
				resizeMode="cover"
			/>
			<Text className="text-slate-500 mt-2">{item.text}</Text>
		</View>
	);
};

export default ListItem;
