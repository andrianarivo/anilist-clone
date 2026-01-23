import { useQuery } from "@apollo/client/react";
import { graphql } from "../../../types/gql";

export const useUpcomingNextSeason = (options?: any) => {
	const QUERY = graphql(`
    query GetUpcomingNextSeasonAnime(
      $page: Int
      $perPage: Int
      $nextSeason: MediaSeason
      $nextYear: Int
    ) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          total
          lastPage
        }
        media(
          season: $nextSeason
          seasonYear: $nextYear
          sort: POPULARITY_DESC
          type: ANIME
          isAdult: false
        ) {
          ...MediaData
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};
