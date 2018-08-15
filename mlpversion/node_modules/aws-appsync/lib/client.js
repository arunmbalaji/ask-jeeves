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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
require("setimmediate");
var apollo_client_1 = require("apollo-client");
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var apollo_link_1 = require("apollo-link");
var apollo_link_http_1 = require("apollo-link-http");
var apollo_utilities_1 = require("apollo-utilities");
var index_1 = require("./cache/index");
exports.defaultDataIdFromObject = index_1.defaultDataIdFromObject;
var link_1 = require("./link");
exports.AUTH_TYPE = link_1.AUTH_TYPE;
var store_1 = require("./store");
exports.createSubscriptionHandshakeLink = function (url, resultsFetcherLink) {
    if (resultsFetcherLink === void 0) { resultsFetcherLink = new apollo_link_http_1.HttpLink({ uri: url }); }
    return apollo_link_1.ApolloLink.split(function (operation) {
        var query = operation.query;
        var _a = apollo_utilities_1.getMainDefinition(query), kind = _a.kind, graphqlOperation = _a.operation;
        var isSubscription = kind === 'OperationDefinition' && graphqlOperation === 'subscription';
        return isSubscription;
    }, apollo_link_1.ApolloLink.from([
        new link_1.NonTerminatingHttpLink('subsInfo', { uri: url }),
        new link_1.SubscriptionHandshakeLink('subsInfo'),
    ]), resultsFetcherLink);
};
exports.createAuthLink = function (_a) {
    var url = _a.url, region = _a.region, auth = _a.auth;
    return new link_1.AuthLink({ url: url, region: region, auth: auth });
};
var passthrough = function (op, forward) { return (forward ? forward(op) : apollo_link_1.Observable.of()); };
exports.createAppSyncLink = function (_a) {
    var url = _a.url, region = _a.region, auth = _a.auth, complexObjectsCredentials = _a.complexObjectsCredentials, _b = _a.resultsFetcherLink, resultsFetcherLink = _b === void 0 ? new apollo_link_http_1.HttpLink({ uri: url }) : _b;
    var link = apollo_link_1.ApolloLink.from([
        createLinkWithStore(function (store) { return new link_1.OfflineLink(store); }),
        new link_1.ComplexObjectLink(complexObjectsCredentials),
        exports.createAuthLink({ url: url, region: region, auth: auth }),
        exports.createSubscriptionHandshakeLink(url, resultsFetcherLink)
    ].filter(Boolean));
    return link;
};
exports.createLinkWithCache = function (createLinkFunc) {
    if (createLinkFunc === void 0) { createLinkFunc = function (cache) { return new apollo_link_1.ApolloLink(passthrough); }; }
    var theLink;
    return new apollo_link_1.ApolloLink(function (op, forward) {
        if (!theLink) {
            var cache = op.getContext().cache;
            theLink = createLinkFunc(cache);
        }
        return theLink.request(op, forward);
    });
};
var createLinkWithStore = function (createLinkFunc) {
    if (createLinkFunc === void 0) { createLinkFunc = function (store) { return new apollo_link_1.ApolloLink(passthrough); }; }
    return exports.createLinkWithCache(function (cache) {
        var store = cache.store;
        return store ? createLinkFunc(store) : new apollo_link_1.ApolloLink(passthrough);
    });
};
var AWSAppSyncClient = /** @class */ (function (_super) {
    __extends(AWSAppSyncClient, _super);
    /**
     *
     * @param {object} appSyncOptions
     * @param {ApolloClientOptions<InMemoryCache>} options
     */
    function AWSAppSyncClient(_a, options) {
        var url = _a.url, region = _a.region, auth = _a.auth, conflictResolver = _a.conflictResolver, complexObjectsCredentials = _a.complexObjectsCredentials, _b = _a.cacheOptions, cacheOptions = _b === void 0 ? {} : _b, _c = _a.disableOffline, disableOffline = _c === void 0 ? false : _c;
        var _this = this;
        var _d = options || {}, _e = _d.cache, customCache = _e === void 0 ? undefined : _e, _f = _d.link, customLink = _f === void 0 ? undefined : _f;
        if (!customLink && (!url || !region || !auth)) {
            throw new Error('In order to initialize AWSAppSyncClient, you must specify url, region and auth properties on the config object or a custom link.');
        }
        var resolveClient;
        var dataIdFromObject = disableOffline ? function () { } : cacheOptions.dataIdFromObject || index_1.defaultDataIdFromObject;
        var store = disableOffline ? null : store_1.createStore(function () { return _this; }, function () { return resolveClient(_this); }, conflictResolver, dataIdFromObject);
        var cache = disableOffline ? (customCache || new apollo_cache_inmemory_1.InMemoryCache(cacheOptions)) : new index_1.OfflineCache(store, cacheOptions);
        var waitForRehydrationLink = new apollo_link_1.ApolloLink(function (op, forward) {
            var handle = null;
            return new apollo_link_1.Observable(function (observer) {
                _this.hydratedPromise.then(function () {
                    handle = passthrough(op, forward).subscribe(observer);
                }).catch(observer.error);
                return function () {
                    if (handle) {
                        handle.unsubscribe();
                    }
                };
            });
        });
        var link = waitForRehydrationLink.concat(customLink || exports.createAppSyncLink({ url: url, region: region, auth: auth, complexObjectsCredentials: complexObjectsCredentials }));
        var newOptions = __assign({}, options, { link: link,
            cache: cache });
        _this = _super.call(this, newOptions) || this;
        _this.hydratedPromise = disableOffline ? Promise.resolve(_this) : new Promise(function (resolve) { return resolveClient = resolve; });
        _this._disableOffline = disableOffline;
        _this._store = store;
        return _this;
    }
    AWSAppSyncClient.prototype.hydrated = function () {
        return this.hydratedPromise;
    };
    ;
    AWSAppSyncClient.prototype.initQueryManager = function () {
        if (!this.queryManager) {
            _super.prototype.initQueryManager.call(this);
            this._origBroadcastQueries = this.queryManager.broadcastQueries;
        }
    };
    AWSAppSyncClient.prototype.isOfflineEnabled = function () {
        return !this._disableOffline;
    };
    AWSAppSyncClient.prototype.mutate = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var update, refetchQueries, _a, origContext, otherOptions, _b, _c, _d, doIt, restAASContext, context, optimisticResponse, variables, data, newOptions, _e, enqueuedMutations, result, _f, enquededMutations, data_1, _g, idsMap_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        update = options.update, refetchQueries = options.refetchQueries, _a = options.context, origContext = _a === void 0 ? {} : _a, otherOptions = __rest(options, ["update", "refetchQueries", "context"]);
                        _b = origContext.AASContext, _c = _b === void 0 ? {} : _b, _d = _c.doIt, doIt = _d === void 0 ? false : _d, restAASContext = __rest(_c, ["doIt"]);
                        context = __assign({}, origContext, { AASContext: __assign({ doIt: doIt }, restAASContext, (!doIt ? { refetchQueries: refetchQueries, update: update } : {}), (doIt ? { client: this } : {})) });
                        optimisticResponse = otherOptions.optimisticResponse, variables = otherOptions.variables;
                        data = optimisticResponse &&
                            (typeof optimisticResponse === 'function' ? __assign({}, optimisticResponse(variables)) : optimisticResponse);
                        newOptions = __assign({}, otherOptions, { optimisticResponse: doIt ? null : data, update: update }, (this._disableOffline || doIt ? { refetchQueries: refetchQueries } : {}), { context: context });
                        if (!this._disableOffline) {
                            if (!doIt) {
                                _e = index_1.METADATA_KEY, enqueuedMutations = this._store.getState()[_e].snapshot.enqueuedMutations;
                                if (enqueuedMutations === 0) {
                                    boundSaveSnapshot(this._store, this.cache);
                                }
                            }
                        }
                        result = null;
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, _super.prototype.mutate.call(this, newOptions)];
                    case 2:
                        result = _h.sent();
                        return [2 /*return*/, result];
                    case 3:
                        if (!this._disableOffline) {
                            if (doIt && result && result.data) {
                                _f = this._store.getState().offline.outbox, enquededMutations = _f.slice(1);
                                data_1 = result.data;
                                // persist canonical snapshot
                                boundSaveSnapshot(this._store, this.cache);
                                // Save map of client ids with server ids
                                boundSaveServerId(this._store, optimisticResponse, data_1);
                                _g = index_1.METADATA_KEY, idsMap_1 = this._store.getState()[_g].idsMap;
                                enquededMutations.forEach(function (_a) {
                                    var _b = _a.meta.offline.effect, update = _b.update, origOptimisticResponse = _b.optimisticResponse;
                                    if (typeof update !== 'function') {
                                        return;
                                    }
                                    var optimisticResponse = link_1.replaceUsingMap(__assign({}, origOptimisticResponse), idsMap_1);
                                    apollo_utilities_1.tryFunctionOrLogError(function () {
                                        update(_this.cache, { data: optimisticResponse });
                                    });
                                });
                                this.queryManager.broadcastQueries = this._origBroadcastQueries;
                                this.queryManager.broadcastQueries();
                            }
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AWSAppSyncClient;
}(apollo_client_1.default));
exports.AWSAppSyncClient = AWSAppSyncClient;
var boundSaveSnapshot = function (store, cache) { return store.dispatch(link_1.saveSnapshot(cache)); };
var boundSaveServerId = function (store, optimisticResponse, data) { return store.dispatch(link_1.saveServerId(optimisticResponse, data)); };
exports.default = AWSAppSyncClient;
