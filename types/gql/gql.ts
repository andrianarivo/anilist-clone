/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment AnimeDetailsData on Media {\n    id\n    studios(isMain: true) {\n      nodes {\n        name\n      }\n    }\n    coverImage {\n      extraLarge\n    }\n    startDate {\n      year\n    }\n    popularity\n    averageScore\n    description(asHtml: true)\n    title {\n      userPreferred\n    }\n    characters(role: MAIN) {\n      nodes {\n        id\n        name {\n          userPreferred\n        }\n        gender\n        image {\n          medium\n        }\n      }\n    }\n  }\n": typeof types.AnimeDetailsDataFragmentDoc,
    "\n  query GetMedia($id: Int) {\n    Media(id: $id) {\n      ...AnimeDetailsData\n    }\n  }\n": typeof types.GetMediaDocument,
    "\n  fragment MediaData on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      extraLarge\n      large\n      color\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    bannerImage\n    season\n    seasonYear\n    description\n    type\n    format\n    status(version: 2)\n    episodes\n    duration\n    chapters\n    volumes\n    genres\n    isAdult\n    averageScore\n    popularity\n    mediaListEntry {\n      id\n      status\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    studios(isMain: true) {\n      edges {\n        isMain\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.MediaDataFragmentDoc,
    "\n  query SearchAnime(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $sort: [MediaSort]\n    $genres: [String]\n    $season: MediaSeason\n    $seasonYear: Int\n    $format_in: [MediaFormat]\n    $status: MediaStatus\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        hasNextPage\n        total\n        lastPage\n      }\n      media(\n        search: $search\n        sort: $sort\n        genre_in: $genres\n        season: $season\n        seasonYear: $seasonYear\n        format_in: $format_in\n        status: $status\n        type: ANIME\n        isAdult: false\n      ) {\n        ...MediaData\n      }\n    }\n  }\n": typeof types.SearchAnimeDocument,
};
const documents: Documents = {
    "\n  fragment AnimeDetailsData on Media {\n    id\n    studios(isMain: true) {\n      nodes {\n        name\n      }\n    }\n    coverImage {\n      extraLarge\n    }\n    startDate {\n      year\n    }\n    popularity\n    averageScore\n    description(asHtml: true)\n    title {\n      userPreferred\n    }\n    characters(role: MAIN) {\n      nodes {\n        id\n        name {\n          userPreferred\n        }\n        gender\n        image {\n          medium\n        }\n      }\n    }\n  }\n": types.AnimeDetailsDataFragmentDoc,
    "\n  query GetMedia($id: Int) {\n    Media(id: $id) {\n      ...AnimeDetailsData\n    }\n  }\n": types.GetMediaDocument,
    "\n  fragment MediaData on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      extraLarge\n      large\n      color\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    bannerImage\n    season\n    seasonYear\n    description\n    type\n    format\n    status(version: 2)\n    episodes\n    duration\n    chapters\n    volumes\n    genres\n    isAdult\n    averageScore\n    popularity\n    mediaListEntry {\n      id\n      status\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    studios(isMain: true) {\n      edges {\n        isMain\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.MediaDataFragmentDoc,
    "\n  query SearchAnime(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $sort: [MediaSort]\n    $genres: [String]\n    $season: MediaSeason\n    $seasonYear: Int\n    $format_in: [MediaFormat]\n    $status: MediaStatus\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        hasNextPage\n        total\n        lastPage\n      }\n      media(\n        search: $search\n        sort: $sort\n        genre_in: $genres\n        season: $season\n        seasonYear: $seasonYear\n        format_in: $format_in\n        status: $status\n        type: ANIME\n        isAdult: false\n      ) {\n        ...MediaData\n      }\n    }\n  }\n": types.SearchAnimeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AnimeDetailsData on Media {\n    id\n    studios(isMain: true) {\n      nodes {\n        name\n      }\n    }\n    coverImage {\n      extraLarge\n    }\n    startDate {\n      year\n    }\n    popularity\n    averageScore\n    description(asHtml: true)\n    title {\n      userPreferred\n    }\n    characters(role: MAIN) {\n      nodes {\n        id\n        name {\n          userPreferred\n        }\n        gender\n        image {\n          medium\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment AnimeDetailsData on Media {\n    id\n    studios(isMain: true) {\n      nodes {\n        name\n      }\n    }\n    coverImage {\n      extraLarge\n    }\n    startDate {\n      year\n    }\n    popularity\n    averageScore\n    description(asHtml: true)\n    title {\n      userPreferred\n    }\n    characters(role: MAIN) {\n      nodes {\n        id\n        name {\n          userPreferred\n        }\n        gender\n        image {\n          medium\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMedia($id: Int) {\n    Media(id: $id) {\n      ...AnimeDetailsData\n    }\n  }\n"): (typeof documents)["\n  query GetMedia($id: Int) {\n    Media(id: $id) {\n      ...AnimeDetailsData\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MediaData on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      extraLarge\n      large\n      color\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    bannerImage\n    season\n    seasonYear\n    description\n    type\n    format\n    status(version: 2)\n    episodes\n    duration\n    chapters\n    volumes\n    genres\n    isAdult\n    averageScore\n    popularity\n    mediaListEntry {\n      id\n      status\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    studios(isMain: true) {\n      edges {\n        isMain\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MediaData on Media {\n    id\n    title {\n      userPreferred\n    }\n    coverImage {\n      extraLarge\n      large\n      color\n    }\n    startDate {\n      year\n      month\n      day\n    }\n    endDate {\n      year\n      month\n      day\n    }\n    bannerImage\n    season\n    seasonYear\n    description\n    type\n    format\n    status(version: 2)\n    episodes\n    duration\n    chapters\n    volumes\n    genres\n    isAdult\n    averageScore\n    popularity\n    mediaListEntry {\n      id\n      status\n    }\n    nextAiringEpisode {\n      airingAt\n      timeUntilAiring\n      episode\n    }\n    studios(isMain: true) {\n      edges {\n        isMain\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchAnime(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $sort: [MediaSort]\n    $genres: [String]\n    $season: MediaSeason\n    $seasonYear: Int\n    $format_in: [MediaFormat]\n    $status: MediaStatus\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        hasNextPage\n        total\n        lastPage\n      }\n      media(\n        search: $search\n        sort: $sort\n        genre_in: $genres\n        season: $season\n        seasonYear: $seasonYear\n        format_in: $format_in\n        status: $status\n        type: ANIME\n        isAdult: false\n      ) {\n        ...MediaData\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchAnime(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $sort: [MediaSort]\n    $genres: [String]\n    $season: MediaSeason\n    $seasonYear: Int\n    $format_in: [MediaFormat]\n    $status: MediaStatus\n  ) {\n    Page(page: $page, perPage: $perPage) {\n      pageInfo {\n        hasNextPage\n        total\n        lastPage\n      }\n      media(\n        search: $search\n        sort: $sort\n        genre_in: $genres\n        season: $season\n        seasonYear: $seasonYear\n        format_in: $format_in\n        status: $status\n        type: ANIME\n        isAdult: false\n      ) {\n        ...MediaData\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;