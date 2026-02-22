import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

const CategoryTypeList = () => {

  const [categoryTypes, setCategoryTypes] = useState([
    { id: '1', name: 'Expense', description: 'All expense categories' },
    { id: '2', name: 'Income', description: 'All income categories' }
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [typeName, setTypeName] = useState('')
  const [description, setDescription] = useState('')

  const handleAddType = () => {
    if (!typeName) return

    const newType = {
      id: Date.now().toString(),
      name: typeName,
      description: description
    }

    setCategoryTypes([...categoryTypes, newType])

    setTypeName('')
    setDescription('')
    setModalVisible(false)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDesc}>{item.description}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#999" />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Category Types</Text>

      <FlatList
        data={categoryTypes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal Popup */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Add Category Type</Text>

            <TextInput
              placeholder="Category Type Name"
              style={styles.input}
              value={typeName}
              onChangeText={setTypeName}
            />

            <TextInput
              placeholder="Description"
              style={[styles.input, { height: 80 }]}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleAddType}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default CategoryTypeList

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    paddingHorizontal: 20
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#2C3E50'
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  cardDesc: {
    fontSize: 13,
    color: '#777',
    marginTop: 4
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4A90E2',
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20
  },

  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },

  input: {
    backgroundColor: '#F4F6FA',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  cancelBtn: {
    padding: 12
  },

  cancelText: {
    color: '#999',
    fontWeight: '600'
  },

  saveBtn: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20
  },

  saveText: {
    color: '#fff',
    fontWeight: 'bold'
  }

})
