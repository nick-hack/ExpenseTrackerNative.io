import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const EmployeeRegister = ({ navigation }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('Male')

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill all required fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    alert("Registration Successful 🎉")
    navigation.replace("Login")
  }

  const InputField = ({ icon, placeholder, value, onChangeText, secure }) => (
    <View style={styles.inputContainer}>
      <MaterialIcons name={icon} size={22} color="#4A90E2" />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <LinearGradient
        colors={['#4A90E2', '#6C63FF']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Employee Register</Text>
        <Text style={styles.headerSubtitle}>
          Create your finance account
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={60} color="#4A90E2" />
          </View>
          <TouchableOpacity style={styles.cameraIcon}>
            <MaterialIcons name="camera-alt" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <InputField
          icon="person"
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />

        <InputField
          icon="email"
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          icon="phone"
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
        />

        <InputField
          icon="lock"
          placeholder="Password"
          secure
          value={password}
          onChangeText={setPassword}
        />

        <InputField
          icon="lock-outline"
          placeholder="Confirm Password"
          secure
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Gender Selection */}
        <Text style={styles.genderTitle}>Select Gender</Text>

        <View style={styles.genderContainer}>
          {['Male', 'Female', 'Other'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.genderButton,
                gender === item && styles.genderSelected
              ]}
              onPress={() => setGender(item)}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === item && { color: '#fff' }
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={{ color: '#555' }}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  )
}

export default EmployeeRegister

const styles = StyleSheet.create({

  safeContainer: {
    flex: 1,
    backgroundColor: '#4A90E2'
  },

  header: {
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },

  headerSubtitle: {
    marginTop: 5,
    color: '#EAEAEA'
  },

  formContainer: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 110,
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 20
  },

  inputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 3
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15
  },

  genderTitle: {
    marginTop: 10,
    marginBottom: 8,
    fontWeight: '600',
    color: '#2C3E50'
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  genderButton: {
    width: '30%',
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#EAF2FF',
    alignItems: 'center'
  },

  genderSelected: {
    backgroundColor: '#4A90E2'
  },

  genderText: {
    fontWeight: '600',
    color: '#4A90E2'
  },

  registerButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5
  },

  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },

  loginText: {
    color: '#4A90E2',
    fontWeight: 'bold'
  }

})
