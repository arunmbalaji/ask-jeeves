import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Search from 'react-native-search-box';


class TotalCost extends React.Component{
  constructor() {
    super();
    this.state = {
      data: [
        {
          Instance_Name:'T2:',
          Instance_Type: 'Burstable Performance Instances',
          Instance_Price_Demand: 'Instance Price On Demand: 0.12/hr',
          Instance_Price_Spot:'Instance Price Spot: Depends on the time',
          Instance_Price_Reserved:'Instance Price Reserved: x amount per year',
        },
      ]
    }
    }
  static NavigationOptions = {
    title: 'Home',
  };

  renderSeparator() {
      return <View style={styles.separator} />
  }
  renderHeader() {
     return (
       <View style={styles.header}>
         <Text style={styles.headerText}>Items Added</Text>
       </View>
     )
  }

  render () {
    return (
<View style = {styles.listContainer}>


<Text> Total Cost : $3500 </Text>

</View>
);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  placeInput: {
    width: "70%"
  },
  listItem: {
      width: "100%",
      marginBottom: 10,
      padding: 10,
  },
  trial:{
    marginBottom:5,
},
header: {
  padding: 10,
},
headerText: {
  fontSize: 30,
  fontWeight: '900'
},
});

export default TotalCost;
