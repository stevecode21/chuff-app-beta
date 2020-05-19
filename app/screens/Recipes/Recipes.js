import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'

export default function Recipes ({ navigation }) {
  // Estado para guardar el estado del usuario logged o no
  const [user, setUser] = useState(null)

  // Hook efecto para preguntarle a firebase si el usuario está o no logueado
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo)
    })
  }, [])
  return (

    <View style={styles.viewBody}>
      <Text>Recipes...</Text>
      {/* Si user existe, mostraremos el icon */}
      {user &&
        <Icon
          reverse
          type='material-community'
          name='plus'
          color='#454648'
          containerStyle={styles.btnContainerAddRecipe}
          onPress={() => navigation.push('add-recipe')}
        />}

    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btnContainerAddRecipe: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#454648',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5
    // left: '50%'
  }
})
