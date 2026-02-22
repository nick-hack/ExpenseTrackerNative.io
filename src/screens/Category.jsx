import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

const Category = ({ navigation, route }) => {

  const [categories, setCategories] = useState([])

  // 🔥 Listen for new category
  useEffect(() => {
    if (route.params?.newCategory) {
      setCategories(prev => [...prev, route.params.newCategory])
    }
  }, [route.params?.newCategory])

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <MaterialIcons name={item.icon} size={26} color="#4A90E2" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Categories</Text>

      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50 }}>
            No categories added yet
          </Text>
        }
      />

      {/* Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddCategory')}
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Category


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F9'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3,
    alignItems: 'center'
  },
  iconBox: {
    backgroundColor: '#EAF2FF',
    padding: 10,
    borderRadius: 15,
    marginRight: 15
  },
  name: {
    fontSize: 16,
    fontWeight: '600'
  },
  type: {
    fontSize: 13,
    color: '#888'
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
