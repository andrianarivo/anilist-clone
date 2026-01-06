import {
	Roboto_100Thin,
	Roboto_100Thin_Italic,
	Roboto_300Light,
	Roboto_300Light_Italic,
	Roboto_400Regular,
	Roboto_400Regular_Italic,
	Roboto_500Medium,
	Roboto_500Medium_Italic,
	Roboto_700Bold,
	Roboto_700Bold_Italic,
	Roboto_900Black,
	Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import { Platform } from "react-native";

export const customFontsToLoad = {
	Roboto_100Thin,
	Roboto_100Thin_Italic,
	Roboto_300Light,
	Roboto_300Light_Italic,
	Roboto_400Regular,
	Roboto_400Regular_Italic,
	Roboto_500Medium,
	Roboto_500Medium_Italic,
	Roboto_700Bold,
	Roboto_700Bold_Italic,
	Roboto_900Black,
	Roboto_900Black_Italic,
};

const fonts = {
	roboto: {
		// Cross-platform Google font.
		light: "Roboto_300Light",
		normal: "Roboto_400Regular",
		medium: "Roboto_500Medium",
		bold: "Roboto_700Bold",
	},
	helveticaNeue: {
		// iOS only font.
		thin: "HelveticaNeue-Thin",
		light: "HelveticaNeue-Light",
		normal: "Helvetica Neue",
		medium: "HelveticaNeue-Medium",
	},
	courier: {
		// iOS only font.
		normal: "Courier",
	},
	sansSerif: {
		// Android only font.
		thin: "sans-serif-thin",
		light: "sans-serif-light",
		normal: "sans-serif",
		medium: "sans-serif-medium",
	},
	monospace: {
		// Android only font.
		normal: "monospace",
	},
};

export const typography = {
	/**
	 * The fonts are available to use, but prefer using the semantic name.
	 */
	fonts,
	/**
	 * The primary font. Used in most places.
	 */
	primary: fonts.roboto,
	/**
	 * An alternate font used for perhaps titles and stuff.
	 */
	secondary: Platform.select({
		ios: fonts.helveticaNeue,
		android: fonts.sansSerif,
	}),
	/**
	 * Lets get fancy with a monospace font!
	 */
	code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
};
