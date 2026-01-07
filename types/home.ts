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


