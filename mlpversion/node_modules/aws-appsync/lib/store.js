"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_offline_1 = require("@redux-offline/redux-offline");
var defaults_1 = require("@redux-offline/redux-offline/lib/defaults");
var constants_1 = require("@redux-offline/redux-offline/lib/constants");
var redux_thunk_1 = require("redux-thunk");
var index_1 = require("./cache/index");
var offline_link_1 = require("./link/offline-link");
/**
 *
 * @param {() => AWSAppSyncClient} clientGetter
 * @param {Function} persistCallback
 * @param {Function} conflictResolver
 */
var newStore = function (clientGetter, persistCallback, conflictResolver, dataIdFromObject) {
    if (clientGetter === void 0) { clientGetter = function () { return null; }; }
    if (persistCallback === void 0) { persistCallback = function () { return null; }; }
    var store = redux_1.createStore(redux_1.combineReducers(__assign({ rehydrated: function (state, action) {
            if (state === void 0) { state = false; }
            switch (action.type) {
                case constants_1.PERSIST_REHYDRATE:
                    return true;
                default:
                    return state;
            }
        } }, index_1.reducer(), offline_link_1.reducer(dataIdFromObject))), typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), redux_offline_1.offline(__assign({}, defaults_1.default, { persistCallback: persistCallback, persistOptions: {
            whitelist: [index_1.NORMALIZED_CACHE_KEY, index_1.METADATA_KEY, 'offline']
        }, effect: function (effect, action) { return offline_link_1.offlineEffect(store, clientGetter(), effect, action); }, discard: offline_link_1.discard(conflictResolver) }))));
    return store;
};
exports.createStore = newStore;
