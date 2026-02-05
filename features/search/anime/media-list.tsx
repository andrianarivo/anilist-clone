import Anime from '@features/anime/anime'
import AnimeSkeleton from '@features/anime/anime-skeleton'
import { FlashList } from '@shopify/flash-list'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { MediaFilters } from 'types/filters'
import { type FragmentType, useFragment as getFragment } from 'types/gql'
import { MediaDataFragmentDoc } from 'types/gql/graphql'
import FilterChip from '@/components/filter-chip'
import {
  FORMAT_OPTIONS,
  SEASON_OPTIONS,
  STATUS_OPTIONS,
  YEAR_OPTIONS,
} from 'types/filters'
import { ScrollView } from 'react-native'

type Props = {
  data?: {
    media?:
      | (FragmentType<typeof MediaDataFragmentDoc> | null | undefined)[]
      | null
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
  filters?: MediaFilters
  onFiltersChange?: (filters: MediaFilters) => void
}

const MediaList = ({
  data,
  loading,
  onEndReached,
  isLoadingMore,
  title,
  filters = {},
  onFiltersChange,
}: Props) => {
  const { top: topInset } = useSafeAreaInsets()
  const paddingTop = topInset || 0

  if (loading && !data) {
    return (
      <View className="flex-1 bg-global-bg">
        <View style={{ paddingTop }}>
          {title && (
            <View className="px-4 py-4 pt-2 flex-row justify-between items-center">
              <Text className="text-3xl font-bold text-global-text">
                {title}
              </Text>
            </View>
          )}
          {['skeleton-1', 'skeleton-2', 'skeleton-3'].map((id) => (
            <AnimeSkeleton key={id} />
          ))}
        </View>
      </View>
    )
  }

  const renderItem = ({
    item,
  }: {
    item: FragmentType<typeof MediaDataFragmentDoc> | null | undefined
  }) => {
    if (!item) return null
    const media = getFragment(MediaDataFragmentDoc, item)
    return (
      <Anime
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
      <FlashList<FragmentType<typeof MediaDataFragmentDoc> | null | undefined>
        data={data?.media || []}
        renderItem={renderItem}
        keyExtractor={(
          item: FragmentType<typeof MediaDataFragmentDoc> | null | undefined,
          index: number,
        ) => {
          if (!item) return index.toString()
          const media = getFragment(MediaDataFragmentDoc, item)
          return media.id.toString()
        }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingTop,
        }}
        ListHeaderComponent={
          title ? (
            <View>
              <View className="px-4 py-4 pt-2 flex-row justify-between items-center">
                <Text className="text-3xl font-bold text-global-text">
                  {title}
                </Text>
              </View>
              {onFiltersChange && (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingBottom: 8,
                  }}
                >
                  <FilterChip
                    label="Year"
                    value={filters.year || null}
                    items={YEAR_OPTIONS.map((y) => ({
                      label: y.toString(),
                      value: y,
                    }))}
                    onValueChange={(v) =>
                      onFiltersChange({ ...filters, year: v || undefined })
                    }
                  />
                  <FilterChip
                    label="Season"
                    value={filters.season || null}
                    items={SEASON_OPTIONS.map((s) => ({
                      label:
                        s.toLowerCase().charAt(0).toUpperCase() +
                        s.toLowerCase().slice(1),
                      value: s,
                    }))}
                    onValueChange={(v) =>
                      onFiltersChange({ ...filters, season: v || undefined })
                    }
                  />
                  <FilterChip
                    label="Format"
                    value={filters.format || null}
                    items={FORMAT_OPTIONS.map((f) => ({
                      label: f
                        .replace(/_/g, ' ')
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase()),
                      value: f,
                    }))}
                    onValueChange={(v) =>
                      onFiltersChange({ ...filters, format: v || undefined })
                    }
                  />
                  <FilterChip
                    label="Status"
                    value={filters.status || null}
                    items={STATUS_OPTIONS.map((s) => ({
                      label: s
                        .replace(/_/g, ' ')
                        .toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase()),
                      value: s,
                    }))}
                    onValueChange={(v) =>
                      onFiltersChange({ ...filters, status: v || undefined })
                    }
                  />
                </ScrollView>
              )}
            </View>
          ) : null
        }
        ListFooterComponent={isLoadingMore ? <AnimeSkeleton /> : null}
      />
    </View>
  )
}

export default MediaList
