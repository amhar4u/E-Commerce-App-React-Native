import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import '../assets/images.png';


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBlockColor:'#007AFF',
    borderRadius: 8,
    backgroundColor: 'white', 
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop:20,
    borderWidth:1,
    width:250,
    height:45,

  },
  buttonText: {
    color: '#2E2E2E',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  touch:{
    borderColor:'#007AFF',
  }
});

const GoogleButton = ({ title, handlesubmit }) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.touch} onPress={handlesubmit}>
      <View style={styles.button}>
        <Image
          source={require('../assets/images.png')} // Replace with your image path
          style={{ width: 24, height: 24, marginRight: 8 }} // Set image width, height, and margin
        />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  </View>
  );
};

export default GoogleButton;
