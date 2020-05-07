// Importo mis Hooks
import React, { useState, useEffect } from 'react'
// Importamos firebase para la autenticación
import * as firebase from 'firebase'
// Importamos el screen del usuario invitado
import UserGuest from './UserGuest'
// Importamos el screen del usuario logeado
import UserLogged from './UserLogged'
// Importaremos el componente Loading
import Loading from '../../components/Loading/Loading'

export default function Account () {
  // Crearemos el state para validar si mi usuario está logueado o no
  const [login, setLogin] = useState(null)
  useEffect(() => {
    // Llamamos a firebase y validamos que cuando el estado del auth cambie, devolverá el usuario
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)

      // Si user es null o no tiene contenido significa que el usuario no está logeado, enviamos false al state, de lo contrario será true en el state ya que el usuario sería diferente a null
      !user ? setLogin(false) : setLogin(true)
    })
  }, [])

  // Si login es exactamente igual a null significa que va a estar cargando, de lo contrario el usuario ya habrá cargado, Loading solamente será visible (gracias a la propiedad isVisible) mientras login es´te null
  if (login === null) return <Loading isVisible text='A unos pocos pasos!' />

  // Si el usuario está logueado, voy a renderizar el componente UserLogged, de lo contrario, renderizaremos el screen del usuario que no está logueado
  return login ? <UserLogged /> : <UserGuest />
}
