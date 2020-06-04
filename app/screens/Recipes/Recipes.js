import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
// Importo mis fonts
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
// Importo el loading para ir precargando las fonts
import { AppLoading } from 'expo'
import { Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'
// Importamos firestore
import 'firebase/firestore'
import ListRecipes from '../../components/Recipes/ListRecipes'
// Inicializo mi DB
const db = firebase.firestore(firebaseApp)

export default function Recipes ({ navigation }) {
  // Cargando las fonts
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold
  })
  // Estado para guardar el estado del usuario logged o no
  const [user, setUser] = useState(null)
  // Aquí vamos a guardar las recetas que traigamos desde firestore
  const [recipes, setRecipes] = useState([])
  // Total recipes, lo inicializamos en 0
  const [totalRecipes, setTotalRecipes] = useState(0)
  // Creamos el estado para definir por donde va a empezar el render de las recetas
  const [startRecipes, setStartRecipes] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // Creamos un limite de recetas que se van a traer en la primera consulta
  const limitRecipes = 5
  // const userId = firebase.auth().currentUser.uid
  // Hook efecto para preguntarle a firebase si el usuario está o no logueado

  useEffect(() => {
    let userIsNotLogged = false
    if (!userIsNotLogged) {
      firebase.auth().onAuthStateChanged((userInfo) => {
        setUser(userInfo)
      })
    }
    return () => {
      userIsNotLogged = true
    }
  }, [])

  // Este hook lo usaremos para el renderizado de las recetas
  useFocusEffect(
    useCallback(() => {
      // Obtenemos todos las recetas que tenemos
      db.collection('recipes')
      // .where('createBy', '==', userId)
        .get()
        .then((snap) => {
          setTotalRecipes(snap.size)
        })

      const resultRecipes = []

      db.collection('recipes')
      // .where('createBy', '==', userId)
        .orderBy('createAt', 'desc')
        .limit(limitRecipes)
        .get()
        .then((response) => {
          setStartRecipes(response.docs[response.docs.length - 1])
          response.forEach((doc) => {
            const recipe = doc.data()
            recipe.id = doc.id
            resultRecipes.push(recipe)
          })
          setRecipes(resultRecipes)
        })
    }, [])
  )

  // useEffect(() => {
  //   // console.log(user)

  //   // console.log('Recetas')
  // }, [])

  const handleLoadMore = () => {
    const resultRecipes = []
    recipes.length < totalRecipes && setIsLoading(true)
    // console.log(`Tus recetas son: ${recipes}`)
    console.log('esto sigue corriendo')

    db.collection('recipes')
      // .where('createBy', '==', userId)
      .orderBy('createAt', 'desc')
      .startAfter(startRecipes.data().createAt)
      .limit(limitRecipes)
      .get()
      .then(response => {
        if (response.docs.length > 0) {
          setStartRecipes(response.docs[response.docs.length - 1])
          // console.log('Peticion realizada con exito' + response)
        } else {
          setIsLoading(false)
        }
        response.forEach((doc) => {
          const recipe = doc.data()
          recipe.id = doc.id
          resultRecipes.push(recipe)
        })
        setRecipes([...recipes, ...resultRecipes])
      })
    // console.log('Hola')
  }
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (

      <View style={styles.viewBody}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Tus recetas</Text>
        </View>
        <View style={styles.listRecipes}>
          <ListRecipes
            recipes={recipes}
            handleLoadMore={handleLoadMore}
            isLoading={isLoading}
          />
        </View>
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
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
    // padding: 50
  },
  containerTitle: {
    backgroundColor: '#5AD2F0',
    flex: 1,
    justifyContent: 'center'
    // marginHorizontal: 30
  },
  title: {
    fontSize: 22,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#454648',
    marginHorizontal: 50
  },
  listRecipes: {
    flex: 4
    // backgroundColor: 'green'
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
