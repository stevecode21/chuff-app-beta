import React from 'react'
// Estamos importanto el componente de Navigation container ya que el sistema de navegacion tiene que estar envuelto en este componente para que funcione
import { NavigationContainer } from '@react-navigation/native'
// Improtamos una función para crear nuestro menú tam
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// Importo los Icons de React Native Elements
import { Icon } from 'react-native-elements'
// import Calendar from '../screens/Calendar'
// En lugar de importar directamente mis screens lo que haré será importar mis stacks
import HomeStack from './HomeStack'
import RecipesStack from './RecipesStack'
import CalendarStack from './CalendarStack'
import ProfileStack from './ProfileStack'

// Crearemos el componente
const Tab = createBottomTabNavigator()

export default function Navigation () {
  return (
    <NavigationContainer>
      <Tab.Navigator
      // Este será el screen inicial una vez se inicie la app
        initialRouteName='home'
        tabBarOptions={{
          // Este será el color que tendrá mis botones del tab cuando no estén seleccionados
          inactiveTintColor: '#646464',
          // Este será el color del menu está activado
          activeTintColor: '#00A680',
          showLabel: false
        }}
        // Esta propiedad recibe las rutas y por las props recibimos
        screenOptions={({ route }) => ({
          //
          tabBarIcon: ({ color }) => screenOptions(route, color)
        })}

      >
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
          name='profile'
          component={ProfileStack}
          options={{ title: 'Profile' }}
        />

      </Tab.Navigator>
    </NavigationContainer>

  )
}

function screenOptions (route, color) {
  // Declaramos una variable para almacenar el iconName
  let iconName

  // El Key será el name de la ruta que definimos en cada una de las routes
  switch (route.name) {
    case 'home':
      // Esta variable guardará el alias de mi Icon
      iconName = 'home-variant'
      break
    case 'recipes':
      // Esta variable guardará el alias de mi Icon
      iconName = 'food-fork-drink'
      break
    case 'events':
      // Esta variable guardará el alias de mi Icon
      iconName = 'calendar-range'
      break
    case 'profile':
      // Esta variable guardará el alias de mi Icon
      iconName = 'account-outline'
      break
    default:
      break
  }
  return (
    // Hacemos el return Icon de react native elements donde le ponemos el tipo de icon de acuerdo a la documentación y en name pasamos mi variable que tiene el alias del icon
    <Icon type='material-community' name={iconName} size={28} color={color} />
  )
}
