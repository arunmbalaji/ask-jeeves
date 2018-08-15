
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { compose, graphql } from 'react-apollo'
import { ListItem } from 'react-native-elements'
import gql from 'graphql-tag'

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
  //   TestSubmitHandler = () => {
  //   if(this.state.searchName.trim === ""){
  //   return;
  //   }
  // this.setState(prevState => {
  //     return{
  //       searches : prevState.searchName
  //     };
  //   });
  //   };


  static NavigationOptions = {
    title: 'Home',
  };


  render() {
    let { items } = this.props;
    // console.log("In main component")
    // console.log(this.props)
    // console.log(items)
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

export default compose(graphql(ListProducts, {
  options: data => ({
    fetchPolicy: 'cache-and-network'
  }),
  props: props => ({
    items: props.data.listProducts,
    onSearch: searchQuery => {
      searchQuery = searchQuery.toLowerCase()
      // console.log("Enter  here")
      // console.log(searchQuery)
      // console.log(props.data);
      return props.data.fetchMore({
        // query: searchQuery === '' ? ListProducts : SearchProducts,
        query: SearchProducts,
        variables: {
          searchQuery
        },
        // updateQuery: (previousResult, {fetchMoreResult}) => ({
        //   ...previousResult,
        //   ListProducts: {
        //     ...previousResult.listIceCreams,
        //     attributes: fetchMoreResult.listProducts.attributes
        //   }
        // })
        updateQuery: (prev, { fetchMoreResult }) => ({
          ...fetchMoreResult
        })
      })
    },
  })
})
)(SearchScreen);
const styles = StyleSheet.create({
  // cart: {
  //   width: "10%",
  //   alignItems: 'center',
  // },
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



    //export default SearchScreen;
