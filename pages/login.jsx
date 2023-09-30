import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GoogleButton from '../components/googlebutton';
import { useNavigation } from '@react-navigation/native';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Remove onAuthStateChanged import
// import { firebaseConfig } from '../components/firebaseConfig';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../components/firebaseConfig'; // Import the Firebase app instance
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [loginStatus, setLoginStatus] = useState(null); // To store login status

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
  };

  const navigation = useNavigation();
  const GoRegister = () => {
    navigation.navigate('Registration');
  };
  const GoForgot = () => {};

  // const handleSubmit = async () => {
  //   validateForm();
  
  //   if (Object.keys(errors).length === 0) {
  //     try {
  //       const auth = getAuth();
  //       await signInWithEmailAndPassword(auth, formData.email, formData.password);
  //       console.log('Login successful.');
  //       // Show a success alert upon successful login
  //       Alert.alert('Login Successful', 'You are now logged in.', [
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             // Redirect to Dashboard after successful login
  //             navigation.navigate('Dashboard'); // Make sure 'Dashboard' matches your actual Dashboard screen name
  //           },
  //         },
  //       ]);
  //     } catch (error) {
  //       console.error('Login error:', error);
  
  //       // Show an error alert for incorrect credentials
  //       Alert.alert('Login Error', 'Incorrect username or password. Please try again.');
  //     }
  //   } else {
  //     console.log('Form has errors. Please correct them.');
  //   }
  // };
  

  const handleSubmit = async () => {
    validateForm();
  
    if (Object.keys(errors).length === 0) {
      try {
        const auth = getAuth(app); // Use the Firebase Auth instance from the Firebase app
        await signInWithEmailAndPassword(auth, formData.email, formData.password);

        // Save user authentication state to AsyncStorage
        await AsyncStorage.setItem('user_authenticated', 'true');

        console.log('Login successful.');
        // Show a success alert upon successful login
        Alert.alert('Login Successful', 'You are now logged in.', [
          {
            text: 'OK',
            onPress: () => {
              // Redirect to Dashboard after successful login
              navigation.navigate('Dashboard');
            },
          },
        ]);
      } catch (error) {
        console.error('Login error:', error);
  
        // Show an error alert for incorrect credentials
        Alert.alert('Login Error', 'Incorrect username or password. Please try again.');
      }
    } else {
      console.log('Form has errors. Please correct them.');
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
            <Text style={styles.login}>Sign In</Text>
          </View>
          {loginStatus && <Text style={styles.loginStatus}>{loginStatus}</Text>}
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
            <Icon name="lock" size={20} color="#007AFF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password} 
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry
            />

          </View>
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <TouchableOpacity
            style={[styles.button, { opacity: Object.keys(errors).length === 0 ? 1 : 0.5 }]}
            disabled={Object.keys(errors).length !== 0}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.or}>_____________or_____________</Text>
          <GoogleButton title={'Sign In With Google'} onPress={() => onClick()} />
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={GoRegister}>
              <Text style={styles.linkText}>Create Account</Text>
            </TouchableOpacity>
            <Text style={styles.linkDivider}> | </Text>
            <TouchableOpacity onPress={GoForgot}>
              <Text style={styles.linkText}>Forgot Password</Text>
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
    flexGrow: 1, // Allow content to grow and be scrollable
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
    marginTop: 5,
    marginStart: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    height: 50,
    width: 260,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 16,
    width: 260,
    marginStart: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 12,
    marginStart: 0,
    marginStart: 23,
  },
  or: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    color: '#2E2E2E',
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
  linkDivider: {
    color: '#2E2E2E',
    fontSize: 16,
    marginHorizontal: 8,
  },
  login: {
    color: '#007AFF',
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  loginStatus: {
    color: 'green',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default Login;
