/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

import React, {useState} from 'react';
// import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Home, Login, Register } from '../src';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
  navigationBarColor: 'black',
  animation: 'slide_from_right',
};

const App = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
