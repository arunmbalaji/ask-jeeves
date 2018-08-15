
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ImageBackground} from 'react-native';
import { createStackNavigator ,createBottomTabNavigator} from 'react-navigation';

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';

import SearchScreen from './src/Searchscreen/SearchScreen'
import ListInstances from './src/ListInstances/ListInstances'
import InstanceDetail from './src/InstanceDetail/InstanceDetail1'

import InstanceNumber1 from './src/InstanceNumber/InstanceNumber1'
import TotalCost from './src/TotalCost/TotalCost'



const client = new AWSAppSyncClient({
  url: "https://k5evtrl4undvng2tspppikphpa.appsync-api.ap-southeast-1.amazonaws.com/graphql",
  region: "ap-southeast-1",
  auth: {
    type: "API_KEY",
    apiKey: "da2-ftsbgnwinnfdxct7xehnq26niy",
  }
});


const NavigationApp = createStackNavigator({
    SearchScreen: { screen : SearchScreen},
    ListInstances: {screen : ListInstances},
    InstanceDetail: {screen : InstanceDetail},

    InstanceNumber1: {screen: InstanceNumber1},
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

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <TabNavigation />
    </Rehydrated>
  </ApolloProvider>
);

export default WithProvider


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