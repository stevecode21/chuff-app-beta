import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import Profile from '../screens/Profile/Profile'
const Stack = createStackNavigator()

export default function ProfileStack () {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='profile'
        component={Profile}
        style={styles.screenAccount}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  screenAccount: {
    backgroundColor: '#fff'
  }

})
