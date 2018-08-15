import React from 'react';
import { FlatList, ActivityIndicator, Text, View ,StyleSheet,TextInput,Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

// export default class FetchExample extends React.Component {

  class ListInstances extends React.Component{
    static NavigationOptions = {
      title: 'Profile',
    };


  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://randomuser.me/api?results=10')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
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


  render(){
    const {navigate} = this.props.navigation;

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
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


    <FlatList

    data={this.state.dataSource}

    renderItem={({item}) => <View >
    <Text  onPress ={ () => navigate('InstanceDetail', { type: item.Instance_Type , name: item.Instance_Name, demand:item.Instance_Price_Demand, spot: item.Instance_Price_Spot, reserved: item.Instance_Price_Reserved})} style = {styles.listItem}>{item.name.first} {item.Instance_Name} {item.Instance_Type}</Text>


    </View>
    } />
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
