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
    "\n    query GetMedia($id: Int) {\n      Media(id: $id) {\n        id\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n        startDate{\n          year\n        }\n        popularity\n        averageScore\n        description(asHtml: true)\n        title {\n          userPreferred\n        }\n        characters(role: MAIN) {\n          nodes {\n            id\n            name {\n              userPreferred\n            }\n            gender\n            image {\n              medium\n            }\n          }\n        }\n      }\n    }\n  ": typeof types.GetMediaDocument,
    "\n    query GetMostPopular {\n      MediaTrend(popularity_greater: 100000) {\n        date\n        popularity\n        averageScore\n        media {\n          id\n          title {\n            userPreferred\n          }\n          bannerImage\n          studios(isMain: true) {\n            nodes {\n              name\n            }\n          }\n        }\n      }\n    }\n  ": typeof types.GetMostPopularDocument,
    "\n    query GetAllMedia {\n      Page(page: 1, perPage: 50) {\n        mediaList {\n          media {\n            id\n            popularity\n            description\n            averageScore\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            startDate {\n              year\n            }\n          }\n        }\n      }\n    }\n  ": typeof types.GetAllMediaDocument,
    "\n    query GetWatching {\n      Page(page: 1, perPage: 10) {\n        mediaList(status_in: [PAUSED]) {\n          progress\n          media {\n            id\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            episodes\n          }\n        }\n      }\n    }\n  ": typeof types.GetWatchingDocument,
};
const documents: Documents = {
    "\n    query GetMedia($id: Int) {\n      Media(id: $id) {\n        id\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n        startDate{\n          year\n        }\n        popularity\n        averageScore\n        description(asHtml: true)\n        title {\n          userPreferred\n        }\n        characters(role: MAIN) {\n          nodes {\n            id\n            name {\n              userPreferred\n            }\n            gender\n            image {\n              medium\n            }\n          }\n        }\n      }\n    }\n  ": types.GetMediaDocument,
    "\n    query GetMostPopular {\n      MediaTrend(popularity_greater: 100000) {\n        date\n        popularity\n        averageScore\n        media {\n          id\n          title {\n            userPreferred\n          }\n          bannerImage\n          studios(isMain: true) {\n            nodes {\n              name\n            }\n          }\n        }\n      }\n    }\n  ": types.GetMostPopularDocument,
    "\n    query GetAllMedia {\n      Page(page: 1, perPage: 50) {\n        mediaList {\n          media {\n            id\n            popularity\n            description\n            averageScore\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            startDate {\n              year\n            }\n          }\n        }\n      }\n    }\n  ": types.GetAllMediaDocument,
    "\n    query GetWatching {\n      Page(page: 1, perPage: 10) {\n        mediaList(status_in: [PAUSED]) {\n          progress\n          media {\n            id\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            episodes\n          }\n        }\n      }\n    }\n  ": types.GetWatchingDocument,
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
export function graphql(source: "\n    query GetMedia($id: Int) {\n      Media(id: $id) {\n        id\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n        startDate{\n          year\n        }\n        popularity\n        averageScore\n        description(asHtml: true)\n        title {\n          userPreferred\n        }\n        characters(role: MAIN) {\n          nodes {\n            id\n            name {\n              userPreferred\n            }\n            gender\n            image {\n              medium\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetMedia($id: Int) {\n      Media(id: $id) {\n        id\n        studios(isMain: true) {\n          nodes {\n            name\n          }\n        }\n        startDate{\n          year\n        }\n        popularity\n        averageScore\n        description(asHtml: true)\n        title {\n          userPreferred\n        }\n        characters(role: MAIN) {\n          nodes {\n            id\n            name {\n              userPreferred\n            }\n            gender\n            image {\n              medium\n            }\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetMostPopular {\n      MediaTrend(popularity_greater: 100000) {\n        date\n        popularity\n        averageScore\n        media {\n          id\n          title {\n            userPreferred\n          }\n          bannerImage\n          studios(isMain: true) {\n            nodes {\n              name\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetMostPopular {\n      MediaTrend(popularity_greater: 100000) {\n        date\n        popularity\n        averageScore\n        media {\n          id\n          title {\n            userPreferred\n          }\n          bannerImage\n          studios(isMain: true) {\n            nodes {\n              name\n            }\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllMedia {\n      Page(page: 1, perPage: 50) {\n        mediaList {\n          media {\n            id\n            popularity\n            description\n            averageScore\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            startDate {\n              year\n            }\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetAllMedia {\n      Page(page: 1, perPage: 50) {\n        mediaList {\n          media {\n            id\n            popularity\n            description\n            averageScore\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            startDate {\n              year\n            }\n          }\n        }\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetWatching {\n      Page(page: 1, perPage: 10) {\n        mediaList(status_in: [PAUSED]) {\n          progress\n          media {\n            id\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            episodes\n          }\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetWatching {\n      Page(page: 1, perPage: 10) {\n        mediaList(status_in: [PAUSED]) {\n          progress\n          media {\n            id\n            title {\n              userPreferred\n            }\n            coverImage {\n              extraLarge\n            }\n            episodes\n          }\n        }\n      }\n    }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;