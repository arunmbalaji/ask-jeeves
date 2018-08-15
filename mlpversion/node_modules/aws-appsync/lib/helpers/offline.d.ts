import { ApolloClient, MutationOptions, SubscribeToMoreOptions } from 'apollo-client';
import { DocumentNode } from 'graphql';
export declare enum CacheOperationTypes {
    AUTO = "auto",
    ADD = "add",
    REMOVE = "remove",
    UPDATE = "update",
}
export declare type QueryWithVariables = {
    query: DocumentNode;
    variables?: object;
};
export declare type CacheUpdateQuery = QueryWithVariables | DocumentNode;
export declare type CacheUpdatesDefinitions = {
    [key in CacheOperationTypes]?: CacheUpdateQuery | CacheUpdateQuery[];
};
export declare type CacheUpdatesOptions = (variables?: object) => CacheUpdatesDefinitions | CacheUpdatesDefinitions;
/**
 * Builds a SubscribeToMoreOptions object ready to be used by Apollo's subscribeToMore() to automatically update the query result in the
 * cache according to the cacheUpdateQuery parameter
 *
 * @param subscriptionQuery The GraphQL subscription DocumentNode or CacheUpdateQuery
 * @param cacheUpdateQuery The query for which the result needs to be updated
 * @param idField
 * @param operationType
 */
declare const buildSubscription: (subscriptionQuery: CacheUpdateQuery, cacheUpdateQuery: CacheUpdateQuery, idField?: string, operationType?: CacheOperationTypes) => SubscribeToMoreOptions<any, {
    [key: string]: any;
}>;
/**
 * Builds a MutationOptions object ready to be used by the ApolloClient to automatically update the cache according to the cacheUpdateQuery
 * parameter
 *
 * @param client An ApolloClient instance
 * @param mutation DocumentNode for the muation
 * @param variables An object with the mutation variables
 * @param cacheUpdateQuery The queries to update in the cache
 * @param typename __typename from your schema
 * @param idField The name of the field with the ID
 * @param operationType Override for the operation type
 *
 * @returns Mutation options to be used by the ApolloClient
 */
declare const buildMutation: (client: ApolloClient<any>, mutation: DocumentNode, variables: object, cacheUpdateQuery: CacheUpdatesOptions, typename: string, idField?: string, operationType?: CacheOperationTypes) => MutationOptions<{
    [key: string]: any;
}, {
    [key: string]: any;
}>;
export { buildSubscription, buildMutation };
