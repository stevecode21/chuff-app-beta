import React from 'react'
import { View, Text, Button } from 'react-native'
// Vamos a importar firebase para deslogear al usuario
import * as firebase from 'firebase'
export default function Profile() {
  return (
    <View>
      <Text>UserLogged...</Text>
      {/* Con un evento onPress lo que haremos será llamar a un método de auth para desloguear al usuario de la sesión activa */}
      <Button
        title='Salir'
        onPress={() => firebase.auth().signOut()} />
    </View>
  )
}
