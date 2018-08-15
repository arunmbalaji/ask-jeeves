import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, FlatList, Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Search from 'react-native-search-box';
import InstanceNumber1 from '../../src/InstanceNumber/InstanceNumber1'


class InstanceDetail extends React.Component{
  constructor() {
    super();
    this.state = {
      data: [
        {
          Instance_Name:'Instance Name: T2:',
          Instance_Type: 'Instance Type: Burstable Performance Instances',
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
         <Text style={styles.headerText}>Instance Details</Text>
       </View>
     )
  }

  render () {
    return (

<View style = {styles.Container}>


<FlatList

data={this.state.data}

renderItem={({item}) => <View >
<Text style = {styles.listItem}>{item.Instance_Name} </Text>

<Text style = {styles.listItem}>{item.Instance_Type}  </Text>

<View style = {{flexDirection: "row"}}>
<Text style = {styles.listItem}>{item.Instance_Price_Demand} </Text>
<View style={[{ width: "10%"}]}>
<Button title="+" onPress ={ () => this.props.navigation.navigate('InstanceNumber1', {title: item.Instance_Name})} />

</View>
</View>

<View style = {{flexDirection: "row"}}>
<Text style = {styles.listItem}>{item.Instance_Price_Spot}   </Text>
<View style={[{ width: "10%"}]}>
<Button title="+" onPress ={ () => this.props.navigation.navigate('InstanceNumber1', {title: item.Instance_Name})} />
    </View>
    </View>

<View style = {{flexDirection: "row"}}>
<Text style = {styles.listItem}>{item.Instance_Price_Reserved}</Text>
<View style={[{ width: "10%"}]}>
<Button title="+" onPress ={ () => this.props.navigation.navigate('InstanceNumber1', {title: item.Instance_Name})} />
    </View>
    </View>

</View>
}

ListHeaderComponent={this.renderHeader}
 ItemSeparatorComponent={this.renderSeparator.bind(this)}
/>


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
  placeInput: {
    width: "70%"
  },
  listItem: {
      width: "90%",
      marginBottom: 10,
      padding: 10,
      flexDirection:"row"
  },
header: {
  padding: 10,
},
headerText: {
  fontSize: 30,
  fontWeight: '900'
},
});

export default InstanceDetail;
