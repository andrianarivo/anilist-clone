import '@expo/match-media';
import React from 'react';
import {
  FlatList,
  Platform,
  SectionList,
  SectionListData,
  SectionListProps,
} from 'react-native';
import { useMediaQuery } from 'react-responsive';

type DefaultItemT = {
  key: string;
};

type SectionType<ItemT> = SectionListData<ItemT> & { useGrid?: boolean };

type ElementInfo<ItemT> = {
  section: SectionListData<ItemT>;
  item: ItemT;
};

type CollectionViewProps<ItemT> = SectionListProps<ItemT> & {
  sections: ReadonlyArray<SectionType<ItemT>>;
  renderSectionHeader: (info: {
    section: SectionListData<ItemT>;
  }) => React.ReactElement | null;
  renderElement: (info: ElementInfo<ItemT>) => React.ReactElement | null;
};

const renderSectionByType = <ItemT extends DefaultItemT>(
  section: SectionListData<ItemT>,
  renderElement: (info: ElementInfo<ItemT>) => React.ReactElement | null,
  colCount: number
) => {
  switch (section.type) {
    case 'horizontal':
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
    case 'grid':
      return (
        <FlatList
          className='self-center'
          numColumns={colCount}
          keyExtractor={(item) => item.key}
          data={section.data}
          renderItem={({ item }) => {
            return renderElement({ section, item });
          }}
          showsHorizontalScrollIndicator={false}
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
  const isMediumScreen = useMediaQuery({
    minDeviceWidth: 385,
  });
  const supportsMultipleCol = isMediumScreen && Platform.OS !== 'ios';
  const colCount = supportsMultipleCol ? 3 : 2;
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
          {renderSectionByType(section, renderElement, colCount)}
        </>
      )}
      renderItem={() => {
        return null;
      }}
    />
  );
};

export default CollectionView;
