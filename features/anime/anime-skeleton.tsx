import ContentLoader, { Rect } from "react-content-loader/native";
import { useWindowDimensions, View } from "react-native";

const AnimeSkeleton = () => {
	const { width } = useWindowDimensions();
	// Taking into account the m-2 in the original Anime component which is 8px margin
	// The View has m-2 which is 8px margin on all sides. So total width used is width - 16.

	const containerWidth = width - 16;
	const imageAspectHeight = (containerWidth * 9) / 16;
	const totalHeight = imageAspectHeight + 70; // Image height + padding and text lines

	return (
		<View className="m-2 rounded-2xl overflow-hidden bg-white/10">
			<ContentLoader
				speed={2}
				width={containerWidth}
				height={totalHeight}
				viewBox={`0 0 ${containerWidth} ${totalHeight}`}
				backgroundColor="#cbd5e0"
				foregroundColor="#f8f9fa"
				opacity={0.5}
			>
				{/* Image Placeholder */}
				<Rect
					x="0"
					y="0"
					rx="0"
					ry="0"
					width={containerWidth}
					height={imageAspectHeight}
				/>

				{/* Title Placeholder */}
				<Rect
					x="12"
					y={imageAspectHeight + 12}
					rx="4"
					ry="4"
					width={containerWidth * 0.6}
					height="20"
				/>

				{/* Year Placeholder */}
				<Rect
					x="12"
					y={imageAspectHeight + 40}
					rx="4"
					ry="4"
					width="40"
					height="14"
				/>

				{/* Rating Placeholder (Approximate position) */}
				<Rect
					x={containerWidth - 92}
					y={imageAspectHeight + 12}
					rx="4"
					ry="4"
					width="80"
					height="40"
				/>
			</ContentLoader>
		</View>
	);
};

export default AnimeSkeleton;
