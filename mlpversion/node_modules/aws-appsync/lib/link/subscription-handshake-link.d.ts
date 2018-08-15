import { ApolloLink, Observable } from "apollo-link";
export declare class SubscriptionHandshakeLink extends ApolloLink {
    private subsInfoContextKey;
    private clientTopics;
    private topicObserver;
    constructor(subsInfoContextKey: any);
    request(operation: any): Observable<{}>;
    /**
     * @returns  {Promise<void>}
     */
    disconnectAll: () => Promise<any>;
    unsubscribeFromTopic: (client: any, topic: any) => Promise<{}>;
    /**
     *
     * @param {Paho.Client} client
     * @param {Set<string>} topics
     */
    disconnectClient: (client: any, topics: any) => Promise<{}>;
    /**
     *
     * @param {ZenObservable.Observer} observer
     * @param {[any]} connectionsInfo
     * @returns {Promise<void>}
     */
    connectAll: (observer: any, connectionsInfo: any[], lastTopicObserver: any) => Promise<any>;
    connect: (observer: any, lastTopicObserver: any, connectionInfo: any) => Promise<{
        client: {};
        topics: any[];
    }>;
    onMessage: (topic: any, message: any) => void;
}
