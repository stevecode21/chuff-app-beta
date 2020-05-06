import React from 'react'
// Estamos importanto el componente de Navigation container ya que el sistema de navegacion tiene que estar envuelto en este componente para que funcione
import { NavigationContainer } from '@react-navigation/native'
// Improtamos una función para crear nuestro menú tam
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import Calendar from '../screens/Calendar'
// En lugar de importar directamente mis screens lo que haré será importar mis stacks
import HomeStack from './HomeStack'
import RecipesStack from './RecipesStack'
import CalendarStack from './CalendarStack'
import AccountStack from './AccountStack'

// Crearemos el componente
const Tab = createBottomTabNavigator()

export default function Navigation () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Aquí deberia ir nuestra screen de acuerdo al tab, primero le daremos un nombre a la screen, en minuscula y sin espacios */}
        {/* Le decimos el componente que tiene que renderizar cuando se entre a esta screen */}
        <Tab.Screen
          name='home'
          component={HomeStack}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name='recipes'
          component={RecipesStack}
          options={{ title: 'Recetas' }}
        />
        <Tab.Screen
          name='events'
          component={CalendarStack}
          options={{ title: 'Calendario' }}
        />
        <Tab.Screen
          name='account'
          component={AccountStack}
          options={{ title: 'Cuenta' }}
        />

      </Tab.Navigator>
    </NavigationContainer>

  )
}
