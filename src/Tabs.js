import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Image, StyleSheet } from 'react-native'

import SearchScreen from './src/Searchscreen/SearchScreen'
import ListInstances from './src/ListInstances/ListInstances'
import InstanceDetail from './src/InstanceDetail/InstanceDetail1'
import InstanceDetail2 from './src/InstanceDetail/InstanceDetail2'
import InstanceDetail3 from './src/InstanceDetail/InstanceDetail3'
import InstanceDetail4 from './src/InstanceDetail/InstanceDetail4'
import InstanceDetail5 from './src/InstanceDetail/InstanceDetail5'
import InstanceNumber1 from './src/InstanceNumber/InstanceNumber1'
import InstanceNumber2 from './src/InstanceNumber/InstanceNumber2'
import InstanceNumber3 from './src/InstanceNumber/InstanceNumber3'
import InstanceNumber4 from './src/InstanceNumber/InstanceNumber4'
import InstanceNumber5 from './src/InstanceNumber/InstanceNumber5'


import TotalCost from './src/TotalCost/TotalCost'

const tabs = {
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image
          style={[styles.icon, { tintColor }]}
          source={require('./assets/list.png')}
        />
      )
    }
  },
  Cart: {
    screen: TotalCost,
    navigationOptions: {
      title: 'Add City',
      tabBarIcon: ({ tintColor }) => (
        <Image
          style={[styles.icon, { tintColor }]}
          source={require('./assets/plus.png')}
        />
      )
    }
  }
}

const config = {
  tabBarOptions: {
    activeTintColor: '#0091EA',
    inactiveTintColor: '#666',
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
    }
  }
}

export default TabNavigator(tabs, config)

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 26
  }
})
