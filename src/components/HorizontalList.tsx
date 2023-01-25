import React from 'react';
import {
  FlatList,
  ListRenderItem,
  SectionList,
  SectionListData,
} from 'react-native';

interface HorizontalListProps<ItemT> {
  sections: ReadonlyArray<SectionListData<ItemT>>;
  renderSectionHeader?: (info: {
    section: SectionListData<ItemT>;
  }) => React.ReactElement | null;
  renderItem?: ListRenderItem<ItemT> | null | undefined;
}

const HorizontalList = <ItemT extends object>(
  props: HorizontalListProps<ItemT>
) => {
  return (
    <SectionList
      contentContainerStyle={{ paddingHorizontal: 10 }}
      stickySectionHeadersEnabled={false}
      sections={props.sections}
      renderSectionHeader={({ section }) => (
        <>
          {
            //TODO: separate in a TSX file
            props.renderSectionHeader?.({ section: section })
          }
          <FlatList
            horizontal
            data={section.data}
            renderItem={props.renderItem}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
      renderItem={() => {
        return null;
      }}
    />
  );
};

export default HorizontalList;
