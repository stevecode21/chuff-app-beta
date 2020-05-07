import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import Profile from '../screens/Profile/Profile'
import Login from '../screens/Profile/Login'
const Stack = createStackNavigator()

export default function ProfileStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='account'
        component={Profile}
        options={{ title: 'Cuenta' }}
        style={styles.screenAccount}
      />
      <Stack.Screen
        name='login'
        component={Login}
        options={{ title: 'Iniciar Sesión' }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  screenAccount: {
    backgroundColor: '#fff'
  }

})
