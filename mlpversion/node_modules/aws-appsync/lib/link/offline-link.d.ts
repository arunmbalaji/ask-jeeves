import { ApolloLink, Observable } from "apollo-link";
import { DocumentNode } from "graphql";
import { METADATA_KEY } from "../cache";
export declare class OfflineLink extends ApolloLink {
    /**
     * @type {Store}
     * @private
     */
    store: any;
    /**
     *
     * @param {Store} store
     */
    constructor(store: any);
    request(operation: any, forward: any): Observable<{}>;
}
export declare const saveSnapshot: (cache: any) => {
    type: string;
    payload: {
        cache: any;
    };
};
/**
 *
 * @param {*} client
 * @param {*} effect
 * @param {*} action
 */
export declare const offlineEffect: (store: any, client: any, effect: any, action: any) => any;
export declare const reducer: (dataIdFromObject: any) => {
    [METADATA_KEY]: (state: any, action: any) => any;
};
export declare const saveServerId: (optimisticResponse: any, data: any) => {
    type: string;
    meta: any;
    payload: {
        data: any;
    };
};
export interface ConflictResolutionInfo {
    mutation: DocumentNode;
    mutationName: string;
    operationType: string;
    variables: object;
    data: object;
    retries: number;
}
export declare const discard: (fn?: (obj: ConflictResolutionInfo) => string) => (error: any, action: any, retries: any) => any;
export declare const replaceUsingMap: (obj: any, map?: {}) => any;
