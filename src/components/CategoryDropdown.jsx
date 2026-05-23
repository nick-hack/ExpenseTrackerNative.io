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

const CategoryDropdown = ({
  categoryType,
  categoryTypes,
  showDropdown,
  setShowDropdown,
  setCategoryType
}) => {

  return (

    <>

      <Text style={styles.label}>
        Category Type
      </Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() =>
          setShowDropdown(!showDropdown)
        }
      >

        <Text style={styles.dropdownText}>
          {categoryType?.name || 'Select Type'}
        </Text>

        <MaterialIcons
          name="arrow-drop-down"
          size={24}
        />

      </TouchableOpacity>

      {showDropdown && (

        <View style={styles.dropdownList}>

          {categoryTypes.map((type) => (

            <TouchableOpacity
              key={type.id}
              style={styles.dropdownItem}
              onPress={() => {

                setCategoryType(type)

                setShowDropdown(false)
              }}
            >

              <Text style={styles.dropdownItemText}>
                {type.name}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      )}

    </>
  )
}

export default CategoryDropdown

const styles = StyleSheet.create({

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 8,
    color: '#555'
  },

  dropdown: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3
  },

  dropdownText: {
    fontSize: 16
  },

  dropdownList: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
    elevation: 5
  },

  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },

  dropdownItemText: {
    fontSize: 14
  }

})