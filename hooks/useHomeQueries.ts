import { useLazyQuery } from "@apollo/client/react";
import { graphql } from "../types/gql";

export const useLazyMostPopular = () => {
	const QUERY = graphql(`
    query GetMostPopular {
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
  `);
	return useLazyQuery(QUERY);
};

export const useLazyAllMedia = () => {
	const QUERY = graphql(`
    query GetAllMedia {
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
  `);
	return useLazyQuery(QUERY);
};

export const useLazyWatching = () => {
	const QUERY = graphql(`
    query GetWatching {
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
  `);
	return useLazyQuery(QUERY);
};
