/**
 *
 * @param {() => AWSAppSyncClient} clientGetter
 * @param {Function} persistCallback
 * @param {Function} conflictResolver
 */
declare const newStore: (clientGetter: () => any, persistCallback: () => any, conflictResolver: any, dataIdFromObject: any) => any;
export { newStore as createStore };
