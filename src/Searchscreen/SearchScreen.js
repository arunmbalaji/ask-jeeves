import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { compose, graphql } from 'react-apollo'
import { ListItem } from 'react-native-elements'
import gql from 'graphql-tag'

//Uncomment below lines
/*These are the queries will be used by the component to show the
search results. These are exactly same as the appsync queries*/

const SearchProducts = gql`
  query Test ($searchQuery: String) {
    listProducts(searchstring: $searchQuery) {
      id
      attributes {
        instanceType
        vcpu
        memory
        location
      }
    }
  }
`
const ListProducts = gql`
  query {
    listProducts {
      id
      attributes {
        instanceType
        vcpu
        memory
        location
      }
    }
  }
`
class SearchScreen extends React.Component {

  state = {
    searchName: ''//,
    //searches:[]
  }

  searchNameChangedHandler = (val) => {
    this.setState({
      searchName: val
    });
    // this.props.onSearch(val);
  };

  submit = () => {
    let { searchName } = this.state;
    this.props.onSearch(searchName);
  }

  static NavigationOptions = {
    title: 'Home',
  };

  render() {
    let { items } = this.props;
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type Here"
            onChangeText={(text) => this.searchNameChangedHandler(text)}
            style={styles.placeInput}
          />

          <Button
            title="Search"
            onPress={() => this.submit()}
          />
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <View key={item.id}><Text>{item.attributes.instanceType} - {item.attributes.location}</Text></View>}
        />
      </View>
    );
  }
}
//Uncomment the below lines
/*Below lines are the actual higher order react native component to invoke
the query against the appsync api , gets the results, and updates the cache. 
These results are passed to the flatview component to display in the app*/

export default compose(graphql(ListProducts, {
  options: data => ({
    fetchPolicy: 'cache-and-network'
  }),
  props: props => ({
    items: props.data.listProducts,
    onSearch: searchQuery => {
      searchQuery = searchQuery.toLowerCase()
      return props.data.fetchMore({
        query: SearchProducts,
        variables: {
          searchQuery
        },
        updateQuery: (prev, { fetchMoreResult }) => ({
          ...fetchMoreResult
        })
      })
    },
  })
})
)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "right",
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginBottom: 5,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  placeInput: {
    width: "70%",
    height: 50
  },
  listItem: {
    borderBottomColor: '#ededed'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});