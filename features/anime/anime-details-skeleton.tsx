import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { useWindowDimensions, View } from "react-native";

const AnimeDetailsSkeleton = () => {
	const { width } = useWindowDimensions();

	const imageHeight = 374;
	const contentTop = imageHeight + 16;
	const totalHeight = imageHeight + 320;

	return (
		<View className="flex-1 bg-global-bg">
			<ContentLoader
				speed={2}
				width={width}
				height={totalHeight}
				viewBox={`0 0 ${width} ${totalHeight}`}
				backgroundColor="#cbd5e0"
				foregroundColor="#f8f9fa"
				opacity={0.5}
			>
				{/* Cover image */}
				<Rect x="0" y="0" rx="0" ry="0" width={width} height={imageHeight} />

				{/* Title */}
				<Rect
					x="12"
					y={contentTop}
					rx="4"
					ry="4"
					width={width * 0.6}
					height="24"
				/>

				{/* Studio + year */}
				<Rect
					x="12"
					y={contentTop + 32}
					rx="4"
					ry="4"
					width={120}
					height="14"
				/>

				{/* Rating */}
				<Rect
					x={width - 100}
					y={contentTop}
					rx="4"
					ry="4"
					width={88}
					height="16"
				/>
				<Rect
					x={width - 100}
					y={contentTop + 24}
					rx="4"
					ry="4"
					width={88}
					height="12"
				/>

				{/* Description lines */}
				<Rect
					x="20"
					y={contentTop + 68}
					rx="4"
					ry="4"
					width={width - 40}
					height="12"
				/>
				<Rect
					x="20"
					y={contentTop + 88}
					rx="4"
					ry="4"
					width={width - 40}
					height="12"
				/>
				<Rect
					x="20"
					y={contentTop + 108}
					rx="4"
					ry="4"
					width={width * 0.5}
					height="12"
				/>

				{/* Character cards row */}
				<Circle cx="46" cy={contentTop + 168} r="28" />
				<Rect
					x="78"
					y={contentTop + 148}
					rx="8"
					ry="8"
					width={110}
					height="40"
				/>

				<Circle cx={width / 2 + 46} cy={contentTop + 168} r="28" />
				<Rect
					x={width / 2 + 78}
					y={contentTop + 148}
					rx="8"
					ry="8"
					width={110}
					height="40"
				/>

				{/* Second row of characters */}
				<Circle cx="46" cy={contentTop + 232} r="28" />
				<Rect
					x="78"
					y={contentTop + 212}
					rx="8"
					ry="8"
					width={110}
					height="40"
				/>

				<Circle cx={width / 2 + 46} cy={contentTop + 232} r="28" />
				<Rect
					x={width / 2 + 78}
					y={contentTop + 212}
					rx="8"
					ry="8"
					width={110}
					height="40"
				/>
			</ContentLoader>
		</View>
	);
};

export default AnimeDetailsSkeleton;
