export type CollectionType = "horizontal" | "grid";

export interface Item {
	title: string;
	description?: string;
	episode?: string;
	progress?: number;
	rating?: number;
	nbUsers?: number;
	season?: string;
	year?: number;
	uri: string;
	key: string;
}

export interface SectionData {
	title: string;
	watching?: boolean;
	type: CollectionType;
	data: ReadonlyArray<Item>;
}

export interface MostPopularData {
	MediaTrend: {
		popularity: number;
		averageScore: number;
		media: {
			id: number;
			title: {
				userPreferred: string;
			};
			bannerImage: string;
			studios: {
				nodes: {
					name: string;
				}[];
			};
		};
	};
}

export interface AllMediaData {
	Page: {
		mediaList: {
			media: {
				id: number;
				popularity: number;
				description: string;
				averageScore: number;
				title: {
					userPreferred: string;
				};
				coverImage: {
					extraLarge: string;
				};
				startDate: {
					year: number;
				};
			};
		}[];
	};
}

export interface WatchingData {
	Page: {
		mediaList: {
			progress: number;
			media: {
				id: number;
				title: {
					userPreferred: string;
				};
				coverImage: {
					extraLarge: string;
				};
				episodes: number | null;
			};
		}[];
	};
}
