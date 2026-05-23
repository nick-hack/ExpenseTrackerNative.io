import React from 'react'

import {
  Text,
  TextInput,
  StyleSheet
} from 'react-native'

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  height = 60
}) => {

  return (

    <>

      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        placeholder={placeholder}
        style={[
          styles.input,
          { height }
        ]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />

    </>
  )
}

export default CustomInput

const styles = StyleSheet.create({

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 8,
    color: '#555'
  },

  input: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 20,
    fontSize: 16,
    elevation: 3
  }

})