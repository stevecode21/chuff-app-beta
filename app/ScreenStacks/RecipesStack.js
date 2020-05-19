import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Recipes from '../screens/Recipes/Recipes'
import AddRecipe from '../screens/Recipes/AddRecipe'

const Stack = createStackNavigator()

export default function RecipesStack () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='recipes'
        component={Recipes}
        options={{ title: 'Tus recetas' }}
      />
      <Stack.Screen
        name='add-recipe'
        component={AddRecipe}
      />
    </Stack.Navigator>
  )
}
