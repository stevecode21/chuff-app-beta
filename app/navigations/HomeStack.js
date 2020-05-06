import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'

const Stack = createStackNavigator()

export default function RecipesStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='home'
        component={Home}
        options={{ title: 'Home' }}
      />
    </Stack.Navigator>
  )
}
