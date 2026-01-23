import { graphql } from "types/gql";

export const AnimeDetailsData = graphql(`
  fragment AnimeDetailsData on Media {
    id
    studios(isMain: true) {
      nodes {
        name
      }
    }
    coverImage {
      extraLarge
    }
    startDate {
      year
    }
    popularity
    averageScore
    description(asHtml: true)
    title {
      userPreferred
    }
    characters(role: MAIN) {
      nodes {
        id
        name {
          userPreferred
        }
        gender
        image {
          medium
        }
      }
    }
  }
`);
