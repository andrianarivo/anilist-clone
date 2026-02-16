import { Image, Text, View, type ViewProps } from "react-native";

type CharacterProps = ViewProps & {
	id?: string;
	name: string;
	gender: string;
	imageUri: string;
};

const Character = ({
	id,
	name,
	gender,
	imageUri,
	...props
}: CharacterProps) => {
	return (
		<View
			{...props}
			className="flex-row w-[180] items-center bg-card-bg rounded-2xl overflow-hidden shadow-sm mx-1"
		>
			<Image
				className="w-14 h-14 rounded-full m-2"
				source={{ uri: imageUri }}
			/>
			<View className="flex-1 pr-2">
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					className="text-global-text text-sm font-bold"
				>
					{name}
				</Text>
				<Text
					numberOfLines={1}
					ellipsizeMode="tail"
					className="text-secondary-text text-xs"
				>
					{gender}
				</Text>
			</View>
		</View>
	);
};

export default Character;
