import Anime from 'components/anime'
import { MediaFragment } from 'hooks/useAnimeSearchQueries'
import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { type FragmentType, useFragment as getFragment } from 'types/gql'

type Props = {
  data?: {
    media?: (FragmentType<typeof MediaFragment> | null | undefined)[] | null
    pageInfo?: {
      hasNextPage?: boolean | null
      total?: number | null
      lastPage?: number | null
    } | null
  } | null
  loading: boolean
  onEndReached: () => void
  isLoadingMore?: boolean
}

const MediaList = ({ data, loading, onEndReached, isLoadingMore }: Props) => {
  const { bottom: bottomInset } = useSafeAreaInsets()
  const paddingBottom = (bottomInset || 0) + 20

  if (loading && !data) {
    return (
      <View className="flex-1 justify-center items-center bg-deep-black">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  const renderItem = ({
    item,
  }: {
    item: FragmentType<typeof MediaFragment> | null | undefined
  }) => {
    if (!item) return null
    const media = getFragment(MediaFragment, item)
    return (
      <Anime
        key={media.id}
        mediaId={media.id.toString()}
        uri={media.coverImage?.extraLarge || ''}
        ratings={media.averageScore || 0}
        nbUsers={media.popularity || 0}
        title={media.title?.userPreferred || ''}
        year={media.startDate?.year || 0}
        description={media.description || ''}
      />
    )
  }

  return (
    <FlatList
      data={data?.media || []}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        if (!item) return index.toString()
        const media = getFragment(MediaFragment, item)
        return media.id.toString()
      }}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{
        paddingBottom,
      }}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator color="#fff" className="py-4" />
        ) : null
      }
    />
  )
}

export default MediaList
