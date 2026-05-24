import React, {
  useState,
  useEffect
} from 'react'

import {
  StyleSheet,
  ScrollView,
  View,
  Alert
} from 'react-native'

import {
  SafeAreaView
} from 'react-native-safe-area-context'

import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from '../components/Header'
import CustomInput from '../components/CustomInput'
import CategoryDropdown from '../components/CategoryDropdown'
import IconSelector from '../components/IconSelector'
import SaveButton from '../components/SaveButton'

import { BASE_URL } from '../../Config'

const iconList = [
  { id: 1, icon: 'restaurant' },
  { id: 2, icon: 'home' },
  { id: 3, icon: 'flight' },
  { id: 4, icon: 'shopping-cart' },
  { id: 5, icon: 'card-giftcard' },
  { id: 6, icon: 'emoji-events' },
  { id: 7, icon: 'local-offer' },
  { id: 8, icon: 'payments' },
  { id: 9, icon: 'account-balance-wallet' },
  { id: 10, icon: 'local-mall' },
  { id: 11, icon: 'medical-services' },
  { id: 12, icon: 'school' }
]

const AddCategory = ({
  navigation
}) => {

  const [categoryTypes,
    setCategoryTypes] = useState([])

  const [categoryName,
    setCategoryName] = useState('')

  const [categoryType,
    setCategoryType] = useState(null)

  const [description,
    setDescription] = useState('')

  const [selectedIcon,
    setSelectedIcon] =
      useState(iconList[0])

  const [showDropdown,
    setShowDropdown] =
      useState(false)

  const [loading,
    setLoading] =
      useState(false)

  // =========================
  // GET CATEGORY TYPES
  // =========================

  useEffect(() => {
    fetchCategoryTypes()
  }, [])

  const fetchCategoryTypes =
    async () => {

    try {

      setLoading(true)

      const token =
        await AsyncStorage.getItem(
          'token'
        )

      if (!token) {

        Alert.alert(
          'Session Expired',
          'Please login again'
        )

        navigation.replace(
          'Login'
        )

        return
      }

      const response =
        await fetch(
          `${BASE_URL}/getCategoryByUserId`,
          {
            method: 'GET',

            headers: {
              Authorization:
                `Bearer ${token}`,
              Accept:
                'application/json',
            },
          }
        )

      const result =
        await response.json()

      console.log(
        'Category API =>',
        result
      )

      if (
        response.ok &&
        result?.status === 200
      ) {

        const uniqueTypes =
          result?.data?.count
            ?.filter(
              (
                value,
                index,
                self
              ) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.category_type_id ===
                    value.category_type_id
                )
            )
            ?.map((item) => ({
              id:
                item.category_type_id,

              name:
                item.type_name
            }))

        setCategoryTypes(
          uniqueTypes || []
        )

        if (
          uniqueTypes.length > 0
        ) {

          setCategoryType(
            uniqueTypes[0]
          )
        }

      } else {

        Alert.alert(
          'Error',
          result?.message ||
            'Unable to load category types'
        )
      }

    } catch (error) {

      console.log(
        'Category Error =>',
        error
      )

      Alert.alert(
        'Error',
        'Unable to connect server'
      )

    } finally {

      setLoading(false)
    }
  }

  // =========================
  // SAVE CATEGORY
  // =========================

  const handleSave =
    async () => {

    if (!categoryName) {

      Alert.alert(
        'Validation',
        'Please enter category name'
      )

      return
    }

    if (!categoryType) {

      Alert.alert(
        'Validation',
        'Please select category type'
      )

      return
    }

    try {

      setLoading(true)

      const token =
        await AsyncStorage.getItem(
          'token'
        )

      const requestBody = {

        category_type_id:
          categoryType.id,

        category_name:
          categoryName,

        Cdescription:
          description,

        IconsId:
          selectedIcon.id
      }

      console.log(
        'Request Body =>',
        requestBody
      )

      const response =
        await fetch(
          `${BASE_URL}/insertCategory`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',

              Accept:
                'application/json',

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify(
              requestBody
            )
          }
        )

      const result =
        await response.json()

      console.log(
        'Insert Result =>',
        result
      )

      if (
        response.ok &&
        result?.status === 200
      ) {

        Alert.alert(
          'Success',
          result?.message ||
            'Category inserted successfully'
        )

        navigation.goBack()

      } else {

        Alert.alert(
          'Error',
          result?.message ||
            'Something went wrong'
        )
      }

    } catch (error) {

      console.log(
        'Insert Error =>',
        error
      )

      Alert.alert(
        'Error',
        'Unable to connect server'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      {/* HEADER */}
      <Header title="Create Category" />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >

        {/* CATEGORY NAME */}
        <CustomInput
          label="Category Name"
          placeholder="Enter category name"
          value={categoryName}
          onChangeText={
            setCategoryName
          }
        />

        {/* CATEGORY DROPDOWN */}
        <CategoryDropdown
          categoryType={categoryType}
          categoryTypes={
            categoryTypes
          }
          showDropdown={
            showDropdown
          }
          setShowDropdown={
            setShowDropdown
          }
          setCategoryType={
            setCategoryType
          }
        />

        {/* DESCRIPTION */}
        <CustomInput
          label="Description"
          placeholder="Enter description"
          value={description}
          onChangeText={
            setDescription
          }
          multiline
          height={90}
        />

        {/* ICONS */}
        <IconSelector
          iconList={iconList}
          selectedIcon={
            selectedIcon
          }
          setSelectedIcon={
            setSelectedIcon
          }
        />

        <View
          style={{
            height: 120
          }}
        />

      </ScrollView>

      {/* SAVE BUTTON */}
      <SaveButton
        loading={loading}
        onPress={handleSave}
      />

    </SafeAreaView>
  )
}

export default AddCategory

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F2F5F9'
  }

})