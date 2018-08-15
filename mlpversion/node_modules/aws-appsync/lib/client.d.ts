import 'setimmediate';
import ApolloClient, { ApolloClientOptions, MutationOptions } from 'apollo-client';
import { InMemoryCache, ApolloReducerConfig } from 'apollo-cache-inmemory';
import { ApolloLink, FetchResult } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { Store } from 'redux';
import { defaultDataIdFromObject } from './cache/index';
import { AuthLink, AUTH_TYPE } from './link';
import { ApolloCache } from 'apollo-cache';
import { AuthOptions } from './link/auth-link';
import { ConflictResolutionInfo } from './link/offline-link';
import { Credentials, CredentialsOptions } from 'aws-sdk/lib/credentials';
export { defaultDataIdFromObject };
export declare const createSubscriptionHandshakeLink: (url: any, resultsFetcherLink?: HttpLink) => ApolloLink;
export declare const createAuthLink: ({ url, region, auth }: {
    url: any;
    region: any;
    auth: any;
}) => AuthLink;
export declare const createAppSyncLink: ({ url, region, auth, complexObjectsCredentials, resultsFetcherLink, }: {
    url: any;
    region: any;
    auth: any;
    complexObjectsCredentials: any;
    resultsFetcherLink?: HttpLink;
}) => ApolloLink;
export declare const createLinkWithCache: (createLinkFunc?: (cache: ApolloCache<any>) => ApolloLink) => ApolloLink;
export interface CacheWithStore<T> extends ApolloCache<T> {
    store: Store<any>;
}
export interface AWSAppSyncClientOptions {
    url: string;
    region: string;
    auth: AuthOptions;
    conflictResolver?: (info: ConflictResolutionInfo) => string | object;
    complexObjectsCredentials?: () => (Credentials | CredentialsOptions | null) | Credentials | CredentialsOptions | null;
    cacheOptions?: ApolloReducerConfig;
    disableOffline?: boolean;
}
declare class AWSAppSyncClient<TCacheShape> extends ApolloClient<TCacheShape> {
    private hydratedPromise;
    hydrated(): Promise<AWSAppSyncClient<TCacheShape>>;
    private _disableOffline;
    private _store;
    private _origBroadcastQueries;
    initQueryManager(): void;
    /**
     *
     * @param {object} appSyncOptions
     * @param {ApolloClientOptions<InMemoryCache>} options
     */
    constructor({url, region, auth, conflictResolver, complexObjectsCredentials, cacheOptions, disableOffline}: AWSAppSyncClientOptions, options?: ApolloClientOptions<InMemoryCache>);
    isOfflineEnabled(): boolean;
    mutate(options: MutationOptions<TCacheShape>): Promise<FetchResult>;
}
export default AWSAppSyncClient;
export { AWSAppSyncClient };
export { AUTH_TYPE };
