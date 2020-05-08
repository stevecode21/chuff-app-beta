import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { StartingMessage } from '../screens/Start/StartingMessage'
import Login from '../screens/Start/Login'
import Register from '../screens/Start/Register'

const Stack = createStackNavigator()
export default function StartStack () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='start-message'
        component={StartingMessage}
      />
      <Stack.Screen
        name='login'
        component={Login}
      />
      <Stack.Screen
        name='register'
        component={Register}
      />
    </Stack.Navigator>
  )
}
