import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../../Config";

const EditProfile = ({ route, navigation }) => {
  const { userData } = route.params;

  const [firstName, setFirstName] = useState(userData?.first_name || "");
  const [lastName, setLastName] = useState(userData?.last_name || "");
  const [email, setEmail] = useState(userData?.email_id || "");
  const [mobile, setMobile] = useState(userData?.mobile_no || "");

  const [image, setImage] = useState(userData?.profile_pic || null);
  const [loading, setLoading] = useState(false);

  /* ================= IMAGE PICK ================= */
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow gallery access to continue");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    if (!firstName || !lastName || !email || !mobile) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      /* FormData for image upload */
      const formData = new FormData();

      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email_id", email);
      formData.append("mobile_no", mobile);

      if (image && image.startsWith("file")) {
        formData.append("profile_pic", {
          uri: image,
          type: "image/jpeg",
          name: "profile.jpg",
        });
      }

      const response = await fetch(`${BASE_URL}/updateUserProfile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const json = await response.json();

      if (json?.status === 200) {
        Alert.alert("Success", "Profile updated successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", json?.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <MaterialIcons name="camera-alt" size={40} color="#4A90E2" />
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.title}>Edit Profile</Text>
          <Text style={styles.subtitle}>Tap image to change</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Mobile</Text>
          <TextInput style={styles.input} value={mobile} onChangeText={setMobile} />

          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Profile</Text>
            )}
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
  },

  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4A90E2",
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4A90E2",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
  },

  form: {
    paddingHorizontal: 20,
  },

  label: {
    marginBottom: 5,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});