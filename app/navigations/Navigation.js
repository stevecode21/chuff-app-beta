import React from 'react-native'
// Estamos importanto el componente de Navigation container ya que el sistema de navegacion tiene que estar envuelto en este componente para que funcione
import { NavigationContainer } from '@react-navigation/native'
// Improtamos una función para crear nuestro menú tam
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Importamos una de mis screens
import Home from './../screens/Home'

// Crearemos el componente
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Aquí deberia ir nuestra screen de acuerdo al tab, primero le daremos un nombre a la screen, en minuscula y sin espacios */}
        <Tab.Screen njame="home" />
      </Tab.Navigator>
    </NavigationContainer>

  )
}