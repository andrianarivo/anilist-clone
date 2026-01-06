import "@expo/match-media";
import type React from "react";
import {
	FlatList,
	SectionList,
	type SectionListData,
	type SectionListProps,
	type SectionListRenderItem,
} from "react-native";

type DefaultItemT = {
	key: string;
};

type SectionType<ItemT> = SectionListData<ItemT> & { useGrid?: boolean };

type ElementInfo<ItemT> = {
	section: SectionListData<ItemT>;
	item: ItemT;
};

type CollectionRenderItem<ItemT> = (
	info: ElementInfo<ItemT>,
) => React.ReactElement | null;

type CollectionViewProps<ItemT> = SectionListProps<ItemT> & {
	sections: ReadonlyArray<SectionType<ItemT>>;
	renderSectionHeader: SectionListRenderItem<ItemT>;
	renderElement: CollectionRenderItem<ItemT>;
};

const renderSectionByType = <ItemT extends DefaultItemT>(
	section: SectionListData<ItemT>,
	renderElement: CollectionRenderItem<ItemT>,
) => {
	switch (section.type) {
		case "horizontal":
			return (
				<FlatList
					horizontal
					data={section.data}
					renderItem={({ item }) => {
						return renderElement({ section, item });
					}}
					showsHorizontalScrollIndicator={false}
				/>
			);
		case "grid":
			return (
				<FlatList
					keyExtractor={(item) => item.key}
					data={section.data}
					renderItem={({ item }) => {
						return renderElement({ section, item });
					}}
					showsVerticalScrollIndicator={false}
				/>
			);
	}
};

const CollectionView = <ItemT extends DefaultItemT>({
	sections,
	renderSectionHeader,
	renderElement,
	...props
}: CollectionViewProps<ItemT>) => {
	return (
		<SectionList
			{...props}
			stickySectionHeadersEnabled={false}
			sections={sections}
			showsVerticalScrollIndicator={false}
			renderSectionHeader={({ section }) => (
				<>
					{
						//TODO: separate in a TSX file
						renderSectionHeader?.({ section: section })
					}
					{renderSectionByType(section, renderElement)}
				</>
			)}
			renderItem={() => {
				return null;
			}}
		/>
	);
};

export default CollectionView;
