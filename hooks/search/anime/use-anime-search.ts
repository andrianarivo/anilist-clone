import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { graphql } from "types/gql";
import type { MediaFilters } from "types/filters";
import type { MediaSort } from "types/gql/graphql";

const ANIME_SEARCH_QUERY = graphql(`
  query SearchAnime(
    $page: Int
    $perPage: Int
    $search: String
    $sort: [MediaSort]
    $genres: [String]
    $season: MediaSeason
    $seasonYear: Int
    $format_in: [MediaFormat]
    $status: MediaStatus
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        hasNextPage
        total
        lastPage
      }
      media(
        search: $search
        sort: $sort
        genre_in: $genres
        season: $season
        seasonYear: $seasonYear
        format_in: $format_in
        status: $status
        type: ANIME
        isAdult: false
      ) {
        ...MediaData
      }
    }
  }
`);

type UseAnimeSearchOptions = {
	filters: MediaFilters;
	defaultSort: MediaSort[];
	perPage?: number;
};

function buildVariables(
	filters: MediaFilters,
	defaultSort: MediaSort[],
	page: number,
	perPage: number,
) {
	return {
		page,
		perPage,
		search: filters.search || undefined,
		sort: filters.sort ?? defaultSort,
		genres: filters.genres?.length ? filters.genres : undefined,
		season: filters.season || undefined,
		seasonYear: filters.year || undefined,
		format_in: filters.format ? [filters.format] : undefined,
		status: filters.status || undefined,
	};
}

export const useAnimeSearch = ({
	filters,
	defaultSort,
	perPage = 20,
}: UseAnimeSearchOptions) => {
	const pageRef = useRef(1);
	const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

	const variables = buildVariables(filters, defaultSort, 1, perPage);

	const { data, loading, fetchMore } = useQuery(ANIME_SEARCH_QUERY, {
		variables,
	});

	const filtersKey = JSON.stringify(filters);
	useEffect(() => {
		pageRef.current = 1;
	}, [filtersKey]);

	const onEndReached = useCallback(async () => {
		if (!data?.Page?.pageInfo?.hasNextPage || loading || fetchMoreLoading)
			return;

		setFetchMoreLoading(true);
		const nextPage = pageRef.current + 1;

		try {
			await fetchMore({
				variables: { ...variables, page: nextPage },
				updateQuery: (previousResult, { fetchMoreResult }) => {
					if (!fetchMoreResult) return previousResult;
					pageRef.current = nextPage;
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
					};
				},
			});
		} catch (e) {
			console.error(e);
		} finally {
			setFetchMoreLoading(false);
		}
	}, [data, loading, fetchMoreLoading, fetchMore, variables]);

	return {
		data,
		loading,
		fetchMoreLoading,
		onEndReached,
	};
};
