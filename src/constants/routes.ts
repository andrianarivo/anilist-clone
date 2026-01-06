/**
 * Centralized route definitions for the application
 * Use these constants to ensure type-safe navigation
 * - path: for navigation (router.push, router.replace)
 * - name: for Stack.Screen or Tabs.Screen name prop
 */

export const ROUTES = {
	/**
	 * Root-level routes
	 */
	ROOT: {
		TABS_GROUP: { path: "/(tabs)", name: "(tabs)" },
		ANIME_DETAILS: { path: "/anime/[id]", name: "anime/[id]" },
	},

	/**
	 * Tab-based routes
	 */
	TABS: {
		HOME: { path: "/(tabs)", name: "index" },
		SEARCH: { path: "/(tabs)/search", name: "search" },
		SOCIAL: { path: "/(tabs)/social", name: "social" },
		LIBRARY: { path: "/(tabs)/library", name: "library" },
		PROFILE: { path: "/(tabs)/profile", name: "profile" },
	},

	/**
	 * Dynamic routes generators
	 */
	DYNAMIC: {
		ANIME_DETAILS: (id: string | number) => `/anime/${id}` as const,
	},
} as const;
