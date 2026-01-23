import { useQuery } from "@apollo/client/react";
import { graphql } from "../../../types/gql";

export const useTop100 = (options?: any) => {
	const QUERY = graphql(`
    query GetTop100Anime($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          total
          lastPage
        }
        media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
          ...MediaData
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};
