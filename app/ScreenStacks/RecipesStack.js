import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Recipes from '../screens/Recipes/Recipes'
import AddRecipe from '../screens/Recipes/AddRecipe'
import Recipe from '../screens/Recipes/Recipe'

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
      />
      <Stack.Screen
        name='add-recipe'
        component={AddRecipe}
      />
      <Stack.Screen
        name='recipe'
        component={Recipe}
      />
    </Stack.Navigator>
  )
}
