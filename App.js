
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ImageBackground} from 'react-native';
import { createStackNavigator ,createBottomTabNavigator} from 'react-navigation';

/*These lines are to use appsync sdk - apollo based library to access appsync queries/mutations and inline cache */
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import SearchScreen from './src/Searchscreen/SearchScreen'
import TotalCost from './src/TotalCost/TotalCost'

import AppSync from './AppSync.js';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";

// const client = new AWSAppSyncClient({
//   url: "https://k5evtrl4undvng2tspppikphpa.appsync-api.ap-southeast-1.amazonaws.com/graphql",
//   region: "ap-southeast-1",
//   auth: {
//     type: "API_KEY",
//     apiKey: "da2-ftsbgnwinnfdxct7xehnq26niy",
//   }
// });

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: AppSync.apiKey,

      // type: AUTH_TYPE.AWS_IAM,
      // Note - Testing purposes only
      /*credentials: new AWS.Credentials({
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY
      })*/

      // Amazon Cognito Federated Identities using AWS Amplify
      //credentials: () => Auth.currentCredentials(),

      // Amazon Cognito user pools using AWS Amplify
      // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      // jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
});


const NavigationApp = createStackNavigator({
    SearchScreen: { screen : SearchScreen},
    TotalCost: {screen :TotalCost},
});

const Search = createStackNavigator({
    Search: {screen : NavigationApp}
});

const SearchNavigation = createStackNavigator ({
     SearchScreen : { screen: Search}
})

const CartNavigation = createStackNavigator ({
    TotalCost : { screen: TotalCost}
})
const TabNavigation = createBottomTabNavigator({
    Search:{ screen : NavigationApp},
    Cart:{screen : CartNavigation},
},
{
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
        activeTintColor: '#f2f2f2',
        activeBackgroundColor: "#2EC4B6",
        inactiveTintColor: '#666',
        labelStyle: {
            fontSize: 22,
            padding: 12
        }
    }
});

/*Below lines enable react native components to make use of the Apollo 
graphql client and the rehydrated cache */
const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <TabNavigation />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider
//export default withAuthenticator(WithProvider);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
