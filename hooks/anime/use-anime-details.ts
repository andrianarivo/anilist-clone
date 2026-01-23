import { useQuery } from "@apollo/client/react";
import { graphql } from "types/gql";
import type { GetMediaQuery, GetMediaQueryVariables } from "types/gql/graphql";

const GET_ANIME_DETAILS = graphql(`
  query GetMedia($id: Int) {
    Media(id: $id) {
      ...AnimeDetailsData
    }
  }
`);

export const useAnimeDetails = (id: number) => {
	return useQuery<GetMediaQuery, GetMediaQueryVariables>(GET_ANIME_DETAILS, {
		variables: { id },
		skip: !id,
	});
};
