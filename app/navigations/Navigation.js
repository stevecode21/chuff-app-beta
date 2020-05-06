import React from 'react'
// Estamos importanto el componente de Navigation container ya que el sistema de navegacion tiene que estar envuelto en este componente para que funcione
import { NavigationContainer } from '@react-navigation/native'
// Improtamos una función para crear nuestro menú tam
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

// Importamos una de mis screens
import Home from '../screens/Home'
// Importo mi screen Recipes
import Recipes from '../screens/Recipes'
import EventsCalendar from '../screens/EventsCalendar'
import Account from '../screens/Account'
// Crearemos el componente
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Aquí deberia ir nuestra screen de acuerdo al tab, primero le daremos un nombre a la screen, en minuscula y sin espacios */}
        {/* Le decimos el componente que tiene que renderizar cuando se entre a esta screen */}
        <Tab.Screen
          name="home"
          component={Home}
          options={{ title: "Home" }} />
        <Tab.Screen
          name="recipes"
          component={Recipes}
          options={{ title: "Recetas" }} />
        <Tab.Screen
          name="events"
          component={EventsCalendar}
          options={{ title: "Calendario" }} />
        <Tab.Screen
          name="account"
          component={Account}
          options={{ title: "Cuenta" }} />

      </Tab.Navigator>
    </NavigationContainer>

  );
}