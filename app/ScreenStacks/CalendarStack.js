import React from 'react'
// Importamos esta herramienta para poder crear el stack de mi screen
import { createStackNavigator } from '@react-navigation/stack'
// Importa la screen que tendrá mi stack
import Calendar from '../screens/Calendar/Calendar'

const Stack = createStackNavigator()

export default function CalendarStack () {
  return (
    // Este será el stack que contenga mi screen
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* Añadimos cada una de nuestras páginas de nuestra screen */}
      <Stack.Screen
        name='Calendar'
        component={Calendar}

      />
      <Stack.Screen
        name='add-event'
        component={Calendar}

      />
    </Stack.Navigator>
  )
}
