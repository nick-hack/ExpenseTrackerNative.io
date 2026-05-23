import React from 'react'

import {
  Text,
  StyleSheet
} from 'react-native'

import {
  LinearGradient
} from 'expo-linear-gradient'

const Header = ({ title }) => {

  return (

    <LinearGradient
      colors={['#4A90E2', '#6C63FF']}
      style={styles.headerBox}
    >

      <Text style={styles.header}>
        {title}
      </Text>

    </LinearGradient>
  )
}

export default Header

const styles = StyleSheet.create({

  headerBox: {
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  }

})