import { useQuery } from "@apollo/client/react";
import { graphql } from "../types/gql";
import { MediaSeason } from "../types/gql/graphql";

export const MediaFragment = graphql(`
  fragment MediaFragment on Media {
    id
    title {
      userPreferred
    }
    coverImage {
      extraLarge
      large
      color
    }
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    bannerImage
    season
    seasonYear
    description
    type
    format
    status(version: 2)
    episodes
    duration
    chapters
    volumes
    genres
    isAdult
    averageScore
    popularity
    mediaListEntry {
      id
      status
    }
    nextAiringEpisode {
      airingAt
      timeUntilAiring
      episode
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
  }
`);

export const useTrendingAnime = (options?: any) => {
	const QUERY = graphql(`
    query GetTrendingAnime($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          hasNextPage
          total
          lastPage
        }
        media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
          ...MediaFragment
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};

export const usePopularSeasonAnime = (options?: any) => {
	const QUERY = graphql(`
    query GetPopularSeasonAnime($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
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
          ...MediaFragment
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};

export const useUpcomingNextSeasonAnime = (options?: any) => {
	const QUERY = graphql(`
    query GetUpcomingNextSeasonAnime($page: Int, $perPage: Int, $nextSeason: MediaSeason, $nextYear: Int) {
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
          ...MediaFragment
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};

export const useAllTimePopularAnime = (options?: any) => {
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

export const useTop100Anime = (options?: any) => {
	const QUERY = graphql(`
    query GetTop100Anime($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
         pageInfo {
            hasNextPage
            total
            lastPage
          }
        media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
          ...MediaFragment
        }
      }
    }
  `);
	return useQuery(QUERY, options);
};
