import React from 'react'

import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

import {
  MaterialIcons
} from '@expo/vector-icons'

const SaveButton = ({
  loading,
  onPress
}) => {

  return (

    <TouchableOpacity
      style={styles.fab}
      onPress={onPress}
      disabled={loading}
    >

      {loading ? (

        <ActivityIndicator color="#fff" />

      ) : (

        <MaterialIcons
          name="check"
          size={28}
          color="#fff"
        />

      )}

    </TouchableOpacity>
  )
}

export default SaveButton

const styles = StyleSheet.create({

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4A90E2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  }

})