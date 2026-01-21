import Anime from 'components/anime'
import { MediaFragment } from '@hooks/use-anime-search-queries'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
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
  title?: string
}

const MediaList = ({
  data,
  loading,
  onEndReached,
  isLoadingMore,
  title,
}: Props) => {
  const { top: topInset } = useSafeAreaInsets()
  const paddingTop = (topInset || 0)

  if (loading && !data) {
    return (
      <View className="flex-1 justify-center items-center bg-global-bg">
        <ActivityIndicator size="large" color="#3577ff" />
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
        uri={media.coverImage?.extraLarge || media.bannerImage || ''}
        ratings={media.averageScore || 0}
        nbUsers={media.popularity || 0}
        title={media.title?.userPreferred || ''}
        year={media.startDate?.year || 0}
        description={media.description || ''}
      />
    )
  }

  return (
    <View className="flex-1 bg-global-bg">
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
          paddingTop,
        }}
        ListHeaderComponent={
          title ? (
            <View className="px-4 py-4 pt-2">
              <Text className="text-3xl font-bold text-global-text">{title}</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator color="#3577ff" className="py-4" />
          ) : null
        }
      />
    </View>
  )
}

export default MediaList
