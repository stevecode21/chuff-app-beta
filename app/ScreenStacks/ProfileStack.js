import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import Profile from '../screens/Profile/Profile'
// import Login from '../screens/Profile/Login'
// import Register from '../screens/Profile/Register'
const Stack = createStackNavigator()

export default function ProfileStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='account'
        component={Profile}
        // options={{ title: 'Cuenta' }}

        style={styles.screenAccount}
      />
      {/* <Stack.Screen
        name='login'
        component={Login}
        // options={{ title: 'Iniciar Sesión' }}
      />
      <Stack.Screen
        name='register'
        component={Register}
        options={{ title: 'Registrarse' }}
      /> */}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  screenAccount: {
    backgroundColor: '#fff'
  }

})
