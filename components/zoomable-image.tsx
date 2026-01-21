import { Image } from "expo-image";
import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface ZoomableImageProps {
	uri: string;
	style?: StyleProp<ViewStyle>;
	contentFit?: "contain" | "cover";
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

const ZoomableImage: React.FC<ZoomableImageProps> = ({
	uri,
	style,
	contentFit = "contain",
}) => {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();

	// Shared values for scale
	const scale = useSharedValue(1);
	const savedScale = useSharedValue(1);

	// Shared values for translation
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const savedTranslateX = useSharedValue(0);
	const savedTranslateY = useSharedValue(0);

	// Pinch gesture
	const pinchGesture = Gesture.Pinch()
		.onUpdate((event) => {
			// Calculate new scale
			const newScale = savedScale.value * event.scale;
			scale.value = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE));

			// Calculate focal point offset from center
			const focalX = event.focalX - screenWidth / 2;
			const focalY = event.focalY - screenHeight / 2;

			// Adjust translation to keep focal point stable
			if (savedScale.value > 0) {
				translateX.value =
					savedTranslateX.value + focalX * (scale.value / savedScale.value - 1);
				translateY.value =
					savedTranslateY.value + focalY * (scale.value / savedScale.value - 1);
			}

			// Clamp translation to boundaries
			const maxTranslateX = Math.max(
				0,
				(screenWidth * scale.value - screenWidth) / 2,
			);
			const maxTranslateY = Math.max(
				0,
				(screenHeight * scale.value - screenHeight) / 2,
			);

			translateX.value = Math.max(
				-maxTranslateX,
				Math.min(translateX.value, maxTranslateX),
			);
			translateY.value = Math.max(
				-maxTranslateY,
				Math.min(translateY.value, maxTranslateY),
			);
		})
		.onEnd(() => {
			savedScale.value = scale.value;
			savedTranslateX.value = translateX.value;
			savedTranslateY.value = translateY.value;

			// Reset translation when scale returns to 1
			if (scale.value === MIN_SCALE) {
				translateX.value = withTiming(0);
				translateY.value = withTiming(0);
				savedTranslateX.value = 0;
				savedTranslateY.value = 0;
			}
		});

	// Pan gesture
	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			// Only allow panning when zoomed in
			if (scale.value > MIN_SCALE) {
				const newTranslateX = savedTranslateX.value + event.translationX;
				const newTranslateY = savedTranslateY.value + event.translationY;

				// Calculate boundaries based on current scale
				const maxTranslateX = Math.max(
					0,
					(screenWidth * scale.value - screenWidth) / 2,
				);
				const maxTranslateY = Math.max(
					0,
					(screenHeight * scale.value - screenHeight) / 2,
				);

				// Clamp translation to boundaries
				translateX.value = Math.max(
					-maxTranslateX,
					Math.min(newTranslateX, maxTranslateX),
				);
				translateY.value = Math.max(
					-maxTranslateY,
					Math.min(newTranslateY, maxTranslateY),
				);
			}
		})
		.onEnd(() => {
			savedTranslateX.value = translateX.value;
			savedTranslateY.value = translateY.value;
		});

	// Double-tap gesture
	const doubleTapGesture = Gesture.Tap()
		.numberOfTaps(2)
		.onEnd((event) => {
			if (scale.value > MIN_SCALE) {
				// Zoom out to original size
				scale.value = withTiming(MIN_SCALE);
				savedScale.value = MIN_SCALE;
				translateX.value = withTiming(0);
				translateY.value = withTiming(0);
				savedTranslateX.value = 0;
				savedTranslateY.value = 0;
			} else {
				// Zoom in to double-tap scale
				const newScale = DOUBLE_TAP_SCALE;
				scale.value = withTiming(newScale);
				savedScale.value = newScale;

				// Calculate focal point offset from center
				const focalX = event.x - screenWidth / 2;
				const focalY = event.y - screenHeight / 2;

				// Adjust translation to zoom into tap point
				const newTranslateX = -focalX * (newScale - 1);
				const newTranslateY = -focalY * (newScale - 1);

				// Calculate boundaries
				const maxTranslateX = Math.max(
					0,
					(screenWidth * newScale - screenWidth) / 2,
				);
				const maxTranslateY = Math.max(
					0,
					(screenHeight * newScale - screenHeight) / 2,
				);

				// Clamp and animate translation
				translateX.value = withTiming(
					Math.max(-maxTranslateX, Math.min(newTranslateX, maxTranslateX)),
				);
				translateY.value = withTiming(
					Math.max(-maxTranslateY, Math.min(newTranslateY, maxTranslateY)),
				);
				savedTranslateX.value = translateX.value;
				savedTranslateY.value = translateY.value;
			}
		});

	// Combine gestures - simultaneous pan and pinch, with double-tap having priority
	const composedGesture = Gesture.Race(
		doubleTapGesture,
		Gesture.Simultaneous(pinchGesture, panGesture),
	);

	// Animated style
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: translateX.value },
				{ translateY: translateY.value },
				{ scale: scale.value },
			],
		};
	});

	return (
		<GestureDetector gesture={composedGesture}>
			<Animated.View style={[styles.container, style, animatedStyle]}>
				<Image source={{ uri }} style={styles.image} contentFit={contentFit} />
			</Animated.View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default ZoomableImage;
