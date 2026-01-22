import { useQuery } from '@apollo/client/react'
import { graphql } from '../../../types/gql'

export const usePopularSeason = (options?: any) => {
  const QUERY = graphql(`
    query GetPopularSeasonAnime(
      $page: Int
      $perPage: Int
      $season: MediaSeason
      $seasonYear: Int
    ) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          total
          lastPage
        }
        media(
          season: $season
          seasonYear: $seasonYear
          sort: POPULARITY_DESC
          type: ANIME
          isAdult: false
        ) {
          ...MediaData
        }
      }
    }
  `)
  return useQuery(QUERY, options)
}
