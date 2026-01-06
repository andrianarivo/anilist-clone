import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import type {
	AllMediaData,
	MostPopularData,
	WatchingData,
} from "../types/home";

export const useLazyMostPopular = () => {
	const QUERY = gql`
    {
      MediaTrend(popularity_greater: 100000) {
        date
        popularity
        averageScore
        media {
          id
          title {
            userPreferred
          }
          bannerImage
          studios(isMain: true) {
            nodes {
              name
            }
          }
        }
      }
    }
  `;
	return useLazyQuery<MostPopularData>(QUERY);
};

export const useLazyAllMedia = () => {
	const QUERY = gql`
    {
      Page(page: 1, perPage: 50) {
        mediaList {
          media {
            id
            popularity
            description
            averageScore
            title {
              userPreferred
            }
            coverImage {
              extraLarge
            }
            startDate {
              year
            }
          }
        }
      }
    }
  `;
	return useLazyQuery<AllMediaData>(QUERY);
};

export const useLazyWatching = () => {
	const QUERY = gql`
    {
      Page(page: 1, perPage: 10) {
        mediaList(status_in: [PAUSED]) {
          progress
          media {
            id
            title {
              userPreferred
            }
            coverImage {
              extraLarge
            }
            episodes
          }
        }
      }
    }
  `;
	return useLazyQuery<WatchingData>(QUERY);
};
