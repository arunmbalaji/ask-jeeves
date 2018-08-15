import { Observable } from 'apollo-link';
import { ApolloLink } from 'apollo-link';
import { ExecutionResult } from 'graphql';
import { Credentials, CredentialsOptions } from 'aws-sdk/lib/credentials';
export declare enum AUTH_TYPE {
    NONE = "NONE",
    API_KEY = "API_KEY",
    AWS_IAM = "AWS_IAM",
    AMAZON_COGNITO_USER_POOLS = "AMAZON_COGNITO_USER_POOLS",
    OPENID_CONNECT = "OPENID_CONNECT",
}
export declare class AuthLink extends ApolloLink {
    private link;
    /**
     *
     * @param {*} options
     */
    constructor(options: any);
    request(operation: any, forward: any): Observable<ExecutionResult & {
        extensions?: Record<string, any>;
        context?: Record<string, any>;
    }>;
}
export interface AuthOptions {
    type: AUTH_TYPE;
    credentials?: (() => Credentials | CredentialsOptions | null | Promise<Credentials | CredentialsOptions | null>) | Credentials | CredentialsOptions | null;
    apiKey?: (() => (string | Promise<string>)) | string;
    jwtToken?: (() => (string | Promise<string>)) | string;
}
export declare const authLink: ({ url, region, auth: { type, credentials, apiKey, jwtToken } }: {
    url: any;
    region: any;
    auth?: AuthOptions;
}) => ApolloLink;
