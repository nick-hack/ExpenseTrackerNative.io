import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const categoryTypes = ['Income', 'Expense']

const iconList = [
  'restaurant',
  'home',
  'flight',
  'shopping-cart',
  'card-giftcard',
  'emoji-events',
  'local-offer',
  'payments',
  'account-balance-wallet',
  'local-mall',
  'medical-services',
  'school'
]

const AddCategory = ({ navigation }) => {

  const [categoryName, setCategoryName] = useState('')
  const [categoryType, setCategoryType] = useState('Expense')
  const [description, setDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('restaurant')
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSave = () => {
    if (!categoryName) return

    const newCategory = {
      id: Date.now().toString(),
      name: categoryName,
      type: categoryType,
      description,
      icon: selectedIcon
    }

    console.log(newCategory)

    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <LinearGradient
        colors={['#4A90E2', '#6C63FF']}
        style={styles.headerBox}
      >
        <Text style={styles.header}>Create Category</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Category Name */}
        <Text style={styles.label}>Category Name</Text>
        <TextInput
          placeholder="Enter category name"
          style={styles.input}
          value={categoryName}
          onChangeText={setCategoryName}
        />

        {/* Category Type Dropdown */}
        <Text style={styles.label}>Category Type</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>{categoryType}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            {categoryTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownItem}
                onPress={() => {
                  setCategoryType(type)
                  setShowDropdown(false)
                }}
              >
                <Text style={styles.dropdownItemText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Enter description"
          style={[styles.input, { height: 90 }]}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        {/* Icon Selection */}
        <Text style={styles.label}>Select Icon</Text>
        <View style={styles.iconGrid}>
          {iconList.map((icon) => {
            const isSelected = selectedIcon === icon
            return (
              <TouchableOpacity
                key={icon}
                style={[
                  styles.iconCard,
                  isSelected && styles.selectedIcon
                ]}
                onPress={() => setSelectedIcon(icon)}
              >
                <MaterialIcons
                  name={icon}
                  size={26}
                  color={isSelected ? '#4A90E2' : '#777'}
                />
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.fab} onPress={handleSave}>
        <MaterialIcons name="check" size={28} color="#fff" />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default AddCategory


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2F5F9'
  },

  headerBox: {
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },

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
  },

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
