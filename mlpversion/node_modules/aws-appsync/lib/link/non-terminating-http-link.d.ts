import { ApolloLink, Observable } from 'apollo-link';
import { ExecutionResult } from 'graphql';
export declare class NonTerminatingHttpLink extends ApolloLink {
    contextKey: any;
    /** @type {ApolloLink} */
    link: any;
    constructor(contextKey: any, options: any);
    request(operation: any, forward: any): Observable<ExecutionResult & {
        extensions?: Record<string, any>;
        context?: Record<string, any>;
    }>;
}
