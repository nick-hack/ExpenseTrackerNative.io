import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import {
  MaterialIcons
} from '@expo/vector-icons'

const IconSelector = ({
  iconList,
  selectedIcon,
  setSelectedIcon
}) => {

  return (

    <>

      <Text style={styles.label}>
        Select Icon
      </Text>

      <View style={styles.iconGrid}>

        {iconList.map((item) => {

          const isSelected =
            selectedIcon.id === item.id

          return (

            <TouchableOpacity
              key={item.id}
              style={[
                styles.iconCard,
                isSelected &&
                  styles.selectedIcon
              ]}
              onPress={() =>
                setSelectedIcon(item)
              }
            >

              <MaterialIcons
                name={item.icon}
                size={26}
                color={
                  isSelected
                    ? '#4A90E2'
                    : '#777'
                }
              />

            </TouchableOpacity>
          )
        })}

      </View>

    </>
  )
}

export default IconSelector

const styles = StyleSheet.create({

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 8,
    color: '#555'
  },

  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },

  iconCard: {
    width: '22%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3
  },

  selectedIcon: {
    borderWidth: 2,
    borderColor: '#4A90E2'
  }

})