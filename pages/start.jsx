import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';



const StartScreen = () => {

   const navigation = useNavigation();

      const handleGetStarted = () => {
       navigation.navigate('Login');
      };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Enrich</Text>
      <Image
        source={require('../assets/download.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.htext}># Save Your Time</Text>
      <Text style={styles.text}>
        Join Enrich, where time meets convenience and savings,
        making every shopping experience a delight.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
        <Icon name="arrow-right" size={20} color="white" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //margin :20,
    padding:30,
    backgroundColor:'white',
  },
  head:{
    top:40,
    fontSize:50,
    color:'#007AFF',
    marginBottom:20,
    fontWeight:'bold',
    },
  image: {
    top:20,
    width: 500,
    height: 400,
    
  },
  text: {
    top:0,
    fontSize: 20,
    //fontWeight: 'bold',
    marginVertical: 20,
    textAlign:'left',
    textAlignVertical:'center'
  },
  htext: {
    top:20,
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 20,
    color:'#007AFF',
    textAlign:'left',
  },
  button: {
    top:20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF', 
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginRight: 10,
    fontWeight:'bold',
  },
  icon: {
   fontWeight:'normal',

  },
});

export default StartScreen
