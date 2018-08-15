import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList,Button, TextInput} from 'react-native';
import { createStackNavigator } from 'react-navigation';

class ListInstances extends React.Component{
  static NavigationOptions = {
    title: 'Profile',
  };

constructor() {
  super();
  this.state = {
    data: [
      {
        Instance_Id: 'InstanceDetail1',
        Instance_Name:'T2:',
        Instance_Type: 'Burstable Performance Instances',
      },
      {
        Instance_Id: 'InstanceDetail2',
        Instance_Name:'M5:',
        Instance_Type: 'General Purpose Instances',
      },
      {
        Instance_Id: 'InstanceDetail3',
        Instance_Name:'M4:',
        Instance_Type: 'Balance of Compute, Memory, Network Resources',
      },
      {
        Instance_Id: 'InstanceDetail4',
        Instance_Name:'C5:',
        Instance_Type: 'Compute Instances',
      },
      {
        Instance_Id: 'InstanceDetail5',
        Instance_Name:'Z1:',
        Instance_Type: 'Memory Optimised Instances',
      },
    ]
  }
}

renderSeparator() {
    return <View style={styles.separator} />
}
renderHeader() {
   return (
     <View style={styles.header}>
       <Text style={styles.headerText}>Instances</Text>
     </View>
   )
}

render () {
const {navigate} = this.props.navigation;
return (

<View >


<View style = {styles.inputContainer}>
<TextInput
    placeholder="Type Here"
    onChangeText={this.searchChangedHandler}
    style={styles.placeInput}
/>

<View style={{ width: "20%" , }}>
<Button
title = "Search"
onPress ={ () => this.props.navigation.navigate('ListInstances')}
style = {styles.placeButton} />
</View>
</View>


<View >
<Text  onPress ={ () => navigate('InstanceDetail')} style = {styles.listItem}> T2:Burstable Performance Instances</Text>
<Text  onPress ={ () => navigate('InstanceDetail2')} style = {styles.listItem}> M5:General Purpose Instances</Text>
<Text  onPress ={ () => navigate('InstanceDetail3')} style = {styles.listItem}> M4:Balance of Compute, Memory, Network Resources</Text>
<Text  onPress ={ () => navigate('InstanceDetail4')} style = {styles.listItem}> C5:Compute Instances</Text>
<Text  onPress ={ () => navigate('InstanceDetail5')} style = {styles.listItem}>Z1:Memory Optimised Instances</Text>

</View>

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
  listItem: {
      width: "85%",
      marginBottom: 10,
      padding: 10,
  },
  trial:{
    marginBottom:5,

  },
  listContainer: {
    width: "100%",
    margin: 5
  },
separator: {
   height: 0.5,
   width: "100%",
   alignSelf: 'center',
   backgroundColor: "#555"
 },
 header: {
   padding: 10,
 },
 headerText: {
   fontSize: 30,
   fontWeight: '900'
},
placeInput: {
  width: "80%"
},
placeButton : {
  width: "30%"
},
});

export default ListInstances;
