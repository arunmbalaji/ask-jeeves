
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import { graphql, ApolloProvider, compose } from 'react-apollo';
import gql from 'graphql-tag';

import App from './search'


const client = new AWSAppSyncClient({
    url: "https://k5evtrl4undvng2tspppikphpa.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    region: "ap-southeast-1",
    auth: {
        type: "API_KEY",
        apiKey: "da2-ftsbgnwinnfdxct7xehnq26niy",
    },
});


const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

export default WithProvider