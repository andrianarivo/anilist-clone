import React from 'react';
import {
  FlatList,
  ListRenderItem,
  SectionList,
  SectionListData,
  SectionListProps,
} from 'react-native';

type SectionType<ItemT> = SectionListData<ItemT> & { useGrid?: boolean };

type CollectionViewProps<ItemT> = SectionListProps<ItemT> & {
  sections: ReadonlyArray<SectionType<ItemT>>;
  renderSectionHeader?: (info: {
    section: SectionListData<ItemT>;
  }) => React.ReactElement | null;
  renderItem?: ListRenderItem<ItemT> | null | undefined;
  renderSingle?: (info: {
    section: SectionListData<ItemT>;
  }) => React.ReactElement | null;
};

const renderSectionByType = <ItemT extends object & { key: string }>(
  section: SectionListData<ItemT>,
  renderItem: ListRenderItem<ItemT> | null | undefined,
  renderSingle?: (info: {
    section: SectionListData<ItemT>;
  }) => React.ReactElement | null
) => {
  switch (section.type) {
    case 'horizontal':
      return (
        <FlatList
          horizontal
          data={section.data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      );
    case 'grid':
      return (
        <FlatList
          className='self-center'
          numColumns={2}
          keyExtractor={(item) => item.key}
          data={section.data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      );
    case 'banner':
      return renderSingle?.({ section: section });
  }
};

const CollectionView = <ItemT extends object & { key: string }>({
  sections,
  renderSectionHeader,
  renderItem,
  renderSingle,
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
          {renderSectionByType(section, renderItem, renderSingle)}
        </>
      )}
      renderItem={() => {
        return null;
      }}
    />
  );
};

export default CollectionView;
