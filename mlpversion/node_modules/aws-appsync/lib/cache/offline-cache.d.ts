import { Cache } from 'apollo-cache';
import { InMemoryCache, ApolloReducerConfig, NormalizedCache, defaultDataIdFromObject, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Store } from 'redux';
export declare const NORMALIZED_CACHE_KEY = "appsync";
export declare const METADATA_KEY = "appsync-metadata";
export { defaultDataIdFromObject };
export interface OfflineCache extends NormalizedCache {
    rehydrated: boolean;
    [NORMALIZED_CACHE_KEY]: any;
    [METADATA_KEY]: {
        idsMap: object;
    };
}
export default class MyCache extends InMemoryCache {
    private store;
    constructor(store: Store<OfflineCache>, config?: ApolloReducerConfig);
    restore(data: NormalizedCacheObject): this;
    write(write: Cache.WriteOptions): void;
    reset(): Promise<void>;
    getIdsMap(): any;
}
export declare const reducer: () => {
    [NORMALIZED_CACHE_KEY]: (state: {}, action: any) => any;
};
