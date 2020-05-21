import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'
// Importamos firestore
import 'firebase/firestore'
import { ListRecipes } from '../../components/Recipes/ListRecipes'
// Inicializo mi DB
const db = firebase.firestore(firebaseApp)

export default function Recipes ({ navigation }) {
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

  // Hook efecto para preguntarle a firebase si el usuario está o no logueado
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo)
    })
  }, [])
  // Este hook lo usaremos para el renderizado de las recetas
  useEffect(() => {
    const user = firebase.auth().currentUser.uid
    // console.log(user)

    // Obtenemos todos las recetas que tenemos
    db.collection('recipes').where('createBy', '==', user).get().then((snap) => {
      setTotalRecipes(snap.size)
    })
    const resultRecipes = []
    db.collection('recipes')
      .where('createBy', '==', user)
      .orderBy('createAt', 'desc')
      .limit(limitRecipes)
      .get().then((response) => {
        setStartRecipes(response.docs[response.docs.length - 1])
        response.forEach((doc) => {
          const recipe = doc.data()
          recipe.id = doc.id
          resultRecipes.push(recipe)
        })
        setRecipes(resultRecipes)
      })
  }, [])
  const handleLoadMore = () => {
    const resultRecipes = []
    recipes.length < totalRecipes && setIsLoading(true)
    db.collection('recipes')
      .where('createBy', '==', user)
      .orderBy('createAt', 'desc')
      .startAfter(startRecipes.data().createAt)
      .limit(limitRecipes)
      .get()
      .then(response => {
        if (response.docs.length > 0) {
          setStartRecipes(response.docs[response.docs.length - 1])
        } else {
          setIsLoading(false)
        }
        response.forEach((doc) => {
          const recipe = doc.data()
          recipe.id = doc.id
          resultRecipes.push({ recipe })
        })
        setRecipes.push([...recipes, ...resultRecipes])
      })
  }
  return (

    <View style={styles.viewBody}>
      <Text>Recipes...</Text>
      <ListRecipes
        recipes={recipes}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />
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
