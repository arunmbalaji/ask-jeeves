import { Observable } from 'apollo-link';
import { ApolloLink } from 'apollo-link';
import { ExecutionResult } from 'graphql';
export declare class ComplexObjectLink extends ApolloLink {
    private link;
    constructor(credentials: any);
    request(operation: any, forward: any): Observable<ExecutionResult & {
        extensions?: Record<string, any>;
        context?: Record<string, any>;
    }>;
}
export declare const complexObjectLink: (credentials: any) => ApolloLink;
