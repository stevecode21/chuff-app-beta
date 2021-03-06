import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// Con este componente se soluciona el problema de long time for a period time
import { YellowBox } from 'react-native'
// Importamos firebase para la autenticación
import * as firebase from 'firebase'
// Importaremos el componente Loading
import Loading from './app/components/Loading/Loading'
// Importamos la configuración de firebase
import { firebaseApp } from './app/utils/firebase'
// Traigo base 64 para solucionar el problema de 'variable atob' que se genera al almacenar al firestore
import { decode, encode } from 'base-64'

import Navigation from './app/Navigation/Navigation'
import StartStack from './app/ScreenStacks/StartStack'
YellowBox.ignoreWarnings(['Setting a timer'])

// Solucionamos el encode y decode para la solicitud
if (!global.btoa) global.btoa = encode
if (!global.atob) global.atob = decode

export default function App () {
  // Crearemos el state para validar si mi usuario está logueado o no
  const [registered, setRegistered] = useState(null)
  useEffect(() => {
    let userIsNotAuth = false
    if (!userIsNotAuth) {
    // Llamamos a firebase y validamos que cuando el estado del auth cambie, devolverá el usuario
      firebase.auth().onAuthStateChanged((user) => {
      // console.log(user)

        // Si user es null o no tiene contenido significa que el usuario no está logeado, enviamos false al state, de lo contrario será true en el state ya que el usuario sería diferente a null
        !user ? setRegistered(false) : setRegistered(true)
      })
    }
    return () => {
      userIsNotAuth = true
    }
  }, [])

  // Si login es exactamente igual a null significa que va a estar cargando, de lo contrario el usuario ya habrá cargado, Loading solamente será visible (gracias a la propiedad isVisible) mientras login es´te null
  // if (login === null) return <Loading isVisible text='CHÜFF' />

  // Si el usuario está logueado, voy a renderizar el componente UserLogged, de lo contrario, renderizaremos el screen del usuario que no está logueado
  return (
    <NavigationContainer>
      {registered ? (<Navigation />) : (<StartStack />)}
    </NavigationContainer>
  )
}
