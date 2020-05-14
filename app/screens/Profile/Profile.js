import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
// Vamos a importar firebase para deslogear al usuario
import * as firebase from 'firebase'

import Loading from '../../components/Loading/Loading'
import InfoProfile from '../../components/Profile/InfoProfile'

export default function Profile () {
  // Este state será para guardar la informacio´n del usuario que traigo del fetching inicializandolo con un objeto vacio
  const [profileInfo, setProfileInfo] = useState(null)
  // Este state será para el state true o false del loading
  const [loading, setLoading] = useState(false)
  // Este state será para el text del loading para modificar algo
  const [loadingText, setLoadingText] = useState('')
  // Mi referencia para cuando debería aparecer mi toast
  const toastRef = useRef()

  // Usaré este Hook para crear un fetching a Firebase y así traer la información del usuario
  useEffect(() => {
    // El useEffect será autoejecutable y anónima de esta forma, con una función asíncrona
    (async () => {
      // Hago una petición con async await a firebase para obtener el usuario actual
      const user = await firebase.auth().currentUser
      setProfileInfo(user)
    })()
  }, [])
  return (
    <View style={styles.viewProfileInfo}>
      {/* Le pasamos por props a este componente la información del usuario */}
      {/* Si profileInfo tiene datos, se va a renderizar la inforación del usuario */}
      {profileInfo && <InfoProfile profileInfo={profileInfo} />}

      <Text>AccountOptions</Text>
      {/* Con un evento onPress lo que haremos será llamar a un método de auth para desloguear al usuario de la sesión activa */}
      <Button
        title='Salir'
        buttonStyle={styles.btnCloseSession}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position='center' opacity={0.9} />
      <Loading text={loadingText} isVisible={loading} />
    </View>
  )
}

const styles = StyleSheet.create({
  viewProfileInfo: {
    minHeight: '100%',
    backgroundColor: '#FFFFFF'
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: '#454648'
    // height: 46'
  }
})
