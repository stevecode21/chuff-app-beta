import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Recipes from '../screens/Recipes/Recipes'

const Stack = createStackNavigator()

export default function RecipesStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='recipes'
        component={Recipes}
        options={{ title: 'Tus recetas' }}
      />
    </Stack.Navigator>
  )
}
