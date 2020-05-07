// Importaremos el hook de useEffect para testear el firebase
import React from 'react'
import Navigation from './app/navigations/Navigation'
// Importamos la configuración de firebase
import { firebaseApp } from './app/utils/firebase'

export default function App () {
  return (
    <Navigation />
  )
}
