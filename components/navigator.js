import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from '../pages/start';
import Login from '../pages/login';
import Registration from '../pages/register';
import Dashboard from '../admin/dashboard';


function AppStack() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartScreen} options={{headerShown: false,}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false,}} />
      <Stack.Screen name="Registration" component={Registration} options={{headerShown: false,}}/>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false,}}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppStack
