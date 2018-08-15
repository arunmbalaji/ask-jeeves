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
        },
      ]
    }
    }


  // static NavigationOptions = {
  //   title: 'Home',
  // };


  static navigationOptions = ({ navigation }) => ({
    name: navigation.state.params.name,
    type: navigation.state.params.type,
    demand:navigation.state.params.demand,
    spot:navigation.state.params.spot,
    reserved:navigation.state.params.reserved,
  })

// static navoption2 = ({ navigation }) => ({
//   type: navigation.state.params.type,
//
// })
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
//
renderItem={({item}) => <View >
<Text style = {styles.listItem}> Instance Name :  {this.props.navigation.state.params.name} </Text>

<Text style = {styles.listItem}> Instance Type :{this.props.navigation.state.params.type} </Text>

<View style = {{flexDirection: "row"}}>
<Text style = {styles.listItem}> {this.props.navigation.state.params.demand} </Text>
<View style={[{ width: "10%"}]}>
<Button title="+" onPress ={ () => this.props.navigation.navigate('InstanceNumber1', {title: this.props.navigation.state.params.name})} />

</View>
</View>

<View style = {{flexDirection: "row"}}>
<Text style = {styles.listItem}>{this.props.navigation.state.params.spot}  </Text>
<View style={[{ width: "10%"}]}>
<Button title="+" onPress ={ () => this.props.navigation.navigate('InstanceNumber1', {title: this.props.navigation.state.params.name})} />
    </View>
    </View>

<View style = {{flexDirection: "row"}}>
<Text style = {styles.listItem}>  {this.props.navigation.state.params.reserved}</Text>
<View style={[{ width: "10%"}]}>
<Button title="+" onPress ={ () => this.props.navigation.navigate('InstanceNumber1', {title: this.props.navigation.state.params.name})} />
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
