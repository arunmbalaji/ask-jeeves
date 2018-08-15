import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, ImageBackground, Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Search from 'react-native-search-box';


class SearchScreen extends React.Component{

static NavigationOptions = {
    title: 'Home',
};

render () {
return (
  <View>

<View style = {styles.inputContainer}>

<TextInput
          placeholder="Type Here"
          onChangeText={this.searchChangedHandler}
          style={styles.placeInput}
/>

<Button
title = "Search"
 onPress ={ () => this.props.navigation.navigate('ListInstances')}
 />

</View>
</View>
);
}
}

const styles = StyleSheet.create({
  // cart: {
  //   width: "10%",
  //   alignItems: 'center',
  // },
  container: {
    alignItems:"right",
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
    width: "70%"
  },
  backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
});

export default SearchScreen;
