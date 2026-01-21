import { useQuery } from "@apollo/client/react";
import { graphql } from "../../../types/gql";

export const useAllTimePopular = (options?: any) => {
	const QUERY = graphql(`
    query GetAllTimePopularAnime($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
         pageInfo {
            hasNextPage
            total
            lastPage
          }
        media(sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
          ...MediaFragment
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};
