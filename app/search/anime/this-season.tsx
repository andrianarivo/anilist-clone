import MediaList from 'components/media/MediaList'
import { Stack } from 'expo-router'
import { usePopularSeasonAnime } from 'hooks/useAnimeSearchQueries'
import React from 'react'
import { View } from 'react-native'
import { getCurrentSeason } from 'utils/date'

export default function ThisSeasonScreen() {
  const [fetchMoreLoading, setFetchMoreLoading] = React.useState(false)
  const pageRef = React.useRef(1)
  const { season, year } = React.useMemo(() => getCurrentSeason(), [])

  const { data, loading, fetchMore } = usePopularSeasonAnime({
    variables: { page: 1, perPage: 20, season, seasonYear: year },
  })

  const onEndReached = async () => {
    if (!data?.Page?.pageInfo?.hasNextPage || loading || fetchMoreLoading)
      return

    setFetchMoreLoading(true)
    const nextPage = pageRef.current + 1

    try {
      await fetchMore({
        variables: { page: nextPage },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult
          pageRef.current = nextPage
          return {
            ...previousResult,
            Page: {
              ...previousResult.Page,
              pageInfo: fetchMoreResult.Page?.pageInfo,
              media: [
                ...(previousResult.Page?.media || []),
                ...(fetchMoreResult.Page?.media || []),
              ],
            },
          }
        },
      })
    } catch (e) {
      console.error(e)
    } finally {
      setFetchMoreLoading(false)
    }
  }

  return (
    <View className="flex-1">
      <MediaList
        data={data?.Page as any}
        loading={loading}
        onEndReached={onEndReached}
        isLoadingMore={fetchMoreLoading}
      />
    </View>
  )
}
