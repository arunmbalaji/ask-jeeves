import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, { Component } from "react";
import { ScrollView, View, Button, Text, TextInput, Alert, StyleSheet } from 'react-native';

const AllPostsQuery=gql`
query AllPosts {
   listProducts {
      attributes {
        instanceType
        vcpu
        memory
        location
      }
    }
}`
class App extends Component {
  render() {
      console.log(this.props)
    return (
      <View>
        {
          this.props.posts.map((post, index) => (
            <h2 key={index}>{post.name}</h2>
          ))
        }
      </View>
    )
  }
}

export default graphql(AllPostsQuery, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    posts: props.data.listProducts ? props.data.listProducts.attributes : []
  })
})(App)