import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GoogleButton from '../components/googlebutton';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native

// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { ref, set } from 'firebase/database';
// import { initializeApp } from 'firebase/app';
// import { firebaseConfig } from '../components/firebaseConfig';
// import { getDatabase } from 'firebase/database';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../components/firebaseConfig'; // Import the Firebase app instance
import { ref, set } from 'firebase/database';
import { getDatabase } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Registration = () => {
  const navigation = useNavigation(); // Use useNavigation for navigation

 // const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const GoLogin = () => {
    navigation.navigate('Login');
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.contact) {
      newErrors.contact = 'Contact is required';
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact must be 10 numeric characters.';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
  };

  const handleTogglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  // const handleSubmit = async () => {
  //   try {
  //     // Create the user account in Firebase Authentication
  //     const auth = getAuth();
  //     const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  //     const userId = userCredential.user.uid;
  //     const dbRef = ref(database, `users/${userId}`);

  //     const userObj = {
  //       name: formData.name,
  //       email: formData.email,
  //       contact: formData.contact,
  //     };

  //     await set(dbRef, userObj);
  //     console.log('User details added to Realtime Database');

     
  //     setFormData({
  //       name: '',
  //       email: '',
  //       contact: '',
  //       password: '',
  //       confirmPassword: '',
  //       showPassword: false,
  //     });

    
  //     Alert.alert('Registration Successful', 'You can now log in.', [{ text: 'OK', onPress: GoLogin }]);
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // Create the user account in Firebase Authentication
      const auth = getAuth(app); // Use the Firebase Auth instance from the Firebase app
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const userId = userCredential.user.uid;
      const dbRef = ref(database, `users/${userId}`);

      const userObj = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
      };

      await set(dbRef, userObj);
      console.log('User details added to Realtime Database');

      // Save user authentication state to AsyncStorage
      await AsyncStorage.setItem('user_authenticated', 'true');

      setFormData({
        name: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
      });

      Alert.alert('Registration Successful', 'You can now log in.', [{ text: 'OK', onPress: GoLogin }]);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.loginForm}>
          <View style={styles.head}>
            <Text style={styles.login}>Sign Up</Text>
          </View>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#007AFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#007AFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="#007AFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Contact"
              value={formData.contact}
              onChangeText={(text) => setFormData({ ...formData, contact: text })}
            />
          </View>
          {errors.contact && <Text style={styles.error}>{errors.contact}</Text>}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#007AFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={!formData.showPassword}
            />
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
              <Icon
                name={formData.showPassword ? 'eye-slash' : 'eye'}
                size={20}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#007AFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry={!formData.showPassword}
            />
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
              <Icon
                name={formData.showPassword ? 'eye-slash' : 'eye'}
                size={20}
                color="#007AFF"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.or}>_____________or_____________</Text>
          <GoogleButton title={'Sign Up With Google'} onPress={() => onClick()} />
          <View style={styles.linkContainer}>
            <Text style={styles.text}>Have an Account?</Text>
            <TouchableOpacity onPress={GoLogin}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8fd3fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2E2E2E',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    height: 50,
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 260,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  or: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    color: '#2E2E2E',
    marginTop: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 0,
    marginStart: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
  text: {
    color: '#2E2E2E',
    fontSize: 16,
  },
  login: {
    color: '#007AFF',
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Registration;
