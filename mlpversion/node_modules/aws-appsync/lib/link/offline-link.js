"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *     http://aws.amazon.com/asl/
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var apollo_link_1 = require("apollo-link");
var apollo_utilities_1 = require("apollo-utilities");
var constants_1 = require("@redux-offline/redux-offline/lib/constants");
var cache_1 = require("../cache");
var actions = {
    SAVE_SNAPSHOT: 'SAVE_SNAPSHOT',
    ENQUEUE: 'ENQUEUE_OFFLINE_MUTATION',
    COMMIT: 'COMMIT_OFFLINE_MUTATION',
    ROLLBACK: 'ROLLBACK_OFFLINE_MUTATION',
    SAVE_SERVER_ID: 'SAVE_SERVER_ID',
};
var OfflineLink = /** @class */ (function (_super) {
    __extends(OfflineLink, _super);
    /**
     *
     * @param {Store} store
     */
    function OfflineLink(store) {
        var _this = _super.call(this) || this;
        _this.store = store;
        return _this;
    }
    OfflineLink.prototype.request = function (operation, forward) {
        var _this = this;
        return new apollo_link_1.Observable(function (observer) {
            var online = _this.store.getState().offline.online;
            var operationType = apollo_utilities_1.getOperationDefinition(operation.query).operation;
            var isMutation = operationType === 'mutation';
            var isQuery = operationType === 'query';
            if (!online && isQuery) {
                var data = processOfflineQuery(operation, _this.store);
                observer.next({ data: data });
                observer.complete();
                return function () { return null; };
            }
            if (isMutation) {
                var _a = operation.getContext(), optimisticResponse = _a.optimisticResponse, _b = _a.AASContext, _c = (_b === void 0 ? {} : _b).doIt, doIt = _c === void 0 ? false : _c;
                if (!doIt) {
                    if (!optimisticResponse) {
                        console.warn('An optimisticResponse was not provided, it is required when using offline capabilities.');
                        if (!online) {
                            throw new Error('Missing optimisticResponse while offline.');
                        }
                    }
                    var data = enqueueMutation(operation, _this.store);
                    observer.next({ data: data });
                    observer.complete();
                    return function () { return null; };
                }
            }
            var handle = forward(operation).subscribe({
                next: function (data) {
                    if (isMutation) {
                        var _a = operation.getContext(), cache = _a.cache, client = _a.AASContext.client;
                        if (client && client.queryManager) {
                            var _b = cache_1.METADATA_KEY, cacheSnapshot = _this.store.getState()[_b].snapshot.cache;
                            client.queryManager.broadcastQueries = function () { };
                            var silenceBroadcast = cache.silenceBroadcast;
                            cache.silenceBroadcast = true;
                            cache.restore(__assign({}, cacheSnapshot));
                            cache.silenceBroadcast = silenceBroadcast;
                        }
                    }
                    observer.next(data);
                },
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
            });
            return function () {
                if (handle)
                    handle.unsubscribe();
            };
        });
    };
    return OfflineLink;
}(apollo_link_1.ApolloLink));
exports.OfflineLink = OfflineLink;
exports.saveSnapshot = function (cache) { return ({
    type: actions.SAVE_SNAPSHOT,
    payload: { cache: cache },
}); };
/**
 *
 * @param {Operation} operation
 * @param {Store} theStore
 */
var processOfflineQuery = function (operation, theStore) {
    var _a = cache_1.NORMALIZED_CACHE_KEY, _b = theStore.getState()[_a], normalizedCache = _b === void 0 ? {} : _b;
    var query = operation.query, variables = operation.variables;
    var store = apollo_cache_inmemory_1.defaultNormalizedCacheFactory(normalizedCache);
    var data = apollo_cache_inmemory_1.readQueryFromStore({
        store: store,
        query: query,
        variables: variables,
    });
    return data;
};
/**
 *
 * @param {Operation} operation
 * @param {Store} theStore
 */
var enqueueMutation = function (operation, theStore) {
    var mutation = operation.query, variables = operation.variables;
    var _a = operation.getContext(), optimisticResponse = _a.optimisticResponse, _b = _a.AASContext, _c = _b === void 0 ? {} : _b, _d = _c.refetchQueries, refetchQueries = _d === void 0 ? undefined : _d, _e = _c.update, update = _e === void 0 ? undefined : _e;
    setImmediate(function () {
        theStore.dispatch({
            type: actions.ENQUEUE,
            payload: { optimisticResponse: optimisticResponse },
            meta: {
                offline: {
                    effect: {
                        mutation: mutation,
                        variables: variables,
                        refetchQueries: refetchQueries,
                        update: update,
                        optimisticResponse: optimisticResponse,
                    },
                    commit: { type: actions.COMMIT, meta: { optimisticResponse: optimisticResponse } },
                    rollback: { type: actions.ROLLBACK },
                }
            }
        });
    });
    var result;
    if (optimisticResponse) {
        result = optimisticResponse;
    }
    else {
        var mutationDefinition = apollo_utilities_1.getMutationDefinition(mutation);
        result = mutationDefinition.selectionSet.selections.reduce(function (acc, elem) {
            acc[apollo_utilities_1.resultKeyNameFromField(elem)] = null;
            return acc;
        }, {});
    }
    return result;
};
/**
 *
 * @param {*} client
 * @param {*} effect
 * @param {*} action
 */
exports.offlineEffect = function (store, client, effect, action) {
    var doIt = true;
    var _a = effect.variables, origVars = _a === void 0 ? {} : _a, origOptimistic = effect.optimisticResponse, otherOptions = __rest(effect, ["variables", "optimisticResponse"]);
    var context = { AASContext: { doIt: doIt } };
    var _b = cache_1.METADATA_KEY, idsMap = store.getState()[_b].idsMap;
    var variables = exports.replaceUsingMap(__assign({}, origVars), idsMap);
    var optimisticResponse = exports.replaceUsingMap(__assign({}, origOptimistic), idsMap);
    var options = __assign({}, otherOptions, { variables: variables,
        optimisticResponse: optimisticResponse,
        context: context });
    return client.mutate(options);
};
exports.reducer = function (dataIdFromObject) {
    return (_a = {},
        _a[cache_1.METADATA_KEY] = metadataReducer(dataIdFromObject),
        _a);
    var _a;
};
var metadataReducer = function (dataIdFromObject) { return function (state, action) {
    var type = action.type, payload = action.payload;
    switch (type) {
        case constants_1.PERSIST_REHYDRATE:
            var _a = cache_1.METADATA_KEY, rehydratedState = payload[_a];
            return rehydratedState || state;
        default:
            var snapshot = snapshotReducer(state && state.snapshot, action);
            var idsMap = idsMapReducer(state && state.idsMap, __assign({}, action, { remainingMutations: snapshot.enqueuedMutations }), dataIdFromObject);
            return {
                snapshot: snapshot,
                idsMap: idsMap,
            };
    }
}; };
var snapshotReducer = function (state, action) {
    var enqueuedMutations = enqueuedMutationsReducer(state && state.enqueuedMutations, action);
    var cache = cacheSnapshotReducer(state && state.cache, __assign({}, action, { enqueuedMutations: enqueuedMutations }));
    return {
        enqueuedMutations: enqueuedMutations,
        cache: cache,
    };
};
var enqueuedMutationsReducer = function (state, action) {
    if (state === void 0) { state = 0; }
    var type = action.type;
    switch (type) {
        case actions.ENQUEUE:
            return state + 1;
        case actions.COMMIT:
        case actions.ROLLBACK:
            return state - 1;
        default:
            return state;
    }
};
var cacheSnapshotReducer = function (state, action) {
    if (state === void 0) { state = {}; }
    var type = action.type, payload = action.payload;
    switch (type) {
        case actions.SAVE_SNAPSHOT:
            var cache = payload.cache;
            return __assign({}, cache.extract(false));
        default:
            return state;
    }
};
exports.saveServerId = function (optimisticResponse, data) { return ({
    type: actions.SAVE_SERVER_ID,
    meta: optimisticResponse,
    payload: { data: data },
}); };
var idsMapReducer = function (state, action, dataIdFromObject) {
    if (state === void 0) { state = {}; }
    var type = action.type, payload = action.payload, meta = action.meta;
    var optimisticResponse;
    switch (type) {
        case actions.ENQUEUE:
            optimisticResponse = payload;
            var ids = getIds(dataIdFromObject, optimisticResponse);
            var entries = Object.values(ids).reduce(function (acc, id) { return (acc[id] = null, acc); }, {});
            return __assign({}, state, entries);
        case actions.COMMIT:
            var remainingMutations = action.remainingMutations;
            // Clear ids map on last mutation
            return remainingMutations ? state : {};
        case actions.SAVE_SERVER_ID:
            optimisticResponse = meta;
            var data = payload.data;
            var oldIds = getIds(dataIdFromObject, optimisticResponse);
            var newIds = getIds(dataIdFromObject, data);
            var mapped = mapIds(oldIds, newIds);
            return __assign({}, state, mapped);
        default:
            return state;
    }
};
exports.discard = function (fn) {
    if (fn === void 0) { fn = function (obj) { return 'DISCARD'; }; }
    return function (error, action, retries) {
        var _a = error.graphQLErrors, graphQLErrors = _a === void 0 ? [] : _a;
        var conditionalCheck = graphQLErrors.find(function (err) { return err.errorType === 'DynamoDB:ConditionalCheckFailedException'; });
        if (conditionalCheck) {
            if (typeof fn === 'function') {
                var data = conditionalCheck.data;
                var _b = action.meta.offline.effect, mutation = _b.mutation, variables = _b.variables;
                var mutationName = apollo_utilities_1.getOperationName(mutation);
                var operationDefinition = apollo_utilities_1.getOperationDefinition(mutation);
                var operationType = operationDefinition.operation;
                try {
                    var conflictResolutionResult = fn({
                        mutation: mutation,
                        mutationName: mutationName,
                        operationType: operationType,
                        variables: variables,
                        data: data,
                        retries: retries,
                    });
                    if (conflictResolutionResult === 'DISCARD') {
                        return true;
                    }
                    if (conflictResolutionResult) {
                        action.meta.offline.effect.variables = conflictResolutionResult;
                        return false;
                    }
                }
                catch (err) {
                    // console.error('Error running conflict resolution. Discarding mutation.', err);
                    return true;
                }
            }
        }
        else if (graphQLErrors.length) {
            // console.error('Discarding action.', action, graphQLErrors);
            return true;
        }
        else {
            var _c = error.networkError, _d = (_c === void 0 ? { graphQLErrors: [] } : _c).graphQLErrors, graphQLErrors_1 = _d === void 0 ? [] : _d;
            var appSyncClientError = graphQLErrors_1.find(function (err) { return err.errorType && err.errorType.startsWith('AWSAppSyncClient:'); });
            if (appSyncClientError) {
                // console.error('Discarding action.', action, appSyncClientError);
                return true;
            }
        }
        return error.permanent || retries > 10;
    };
};
//#region utils
exports.replaceUsingMap = function (obj, map) {
    if (map === void 0) { map = {}; }
    if (!obj || !map) {
        return obj;
    }
    var newVal = map[obj];
    if (newVal) {
        obj = newVal;
        return obj;
    }
    Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            val.forEach(function (v, i) { return exports.replaceUsingMap(v, map); });
        }
        else if (typeof val === 'object') {
            exports.replaceUsingMap(val, map);
        }
        else {
            var newVal_1 = map[val];
            if (newVal_1) {
                obj[key] = newVal_1;
            }
        }
    });
    return obj;
};
var getIds = function (dataIdFromObject, obj, path, acc) {
    if (path === void 0) { path = ''; }
    if (acc === void 0) { acc = {}; }
    if (!obj) {
        return acc;
    }
    var dataId = dataIdFromObject(obj);
    if (dataId) {
        var _a = dataId.split(':'), id = _a[1];
        acc[path] = id;
    }
    Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            val.forEach(function (v, i) { return getIds(dataIdFromObject, v, path + "." + key + "[" + i + "]", acc); });
        }
        else if (typeof val === 'object') {
            getIds(dataIdFromObject, val, "" + path + (path && '.') + key, acc);
        }
    });
    return getIds(dataIdFromObject, null, path, acc);
};
var intersectingKeys = function (obj1, obj2) {
    if (obj1 === void 0) { obj1 = {}; }
    if (obj2 === void 0) { obj2 = {}; }
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    return keys1.filter(function (k) { return keys2.indexOf(k) !== -1; });
};
var mapIds = function (obj1, obj2) { return intersectingKeys(obj1, obj2).reduce(function (acc, k) { return (acc[obj1[k]] = obj2[k], acc); }, {}); };
//#endregion
