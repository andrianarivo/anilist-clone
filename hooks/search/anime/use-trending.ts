import { useQuery } from "@apollo/client/react";
import { graphql } from "../../../types/gql";

export const useTrending = (options?: any) => {
	const QUERY = graphql(`
    query GetTrendingAnime($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          total
          lastPage
        }
        media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
          ...MediaData
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};
