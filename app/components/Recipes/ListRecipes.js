import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from 'lodash'
// Importo mis fonts
import { useFonts, Montserrat_500Medium } from '@expo-google-fonts/montserrat'
// Importo el loading para ir precargando las fonts
import { AppLoading } from 'expo'
// Importamos el hook de navigation para poder navegar dentro del stack
import { useNavigation } from '@react-navigation/native'

export default function ListRecipes (props) {
  const { recipes, handleLoadMore, isLoading } = props
  // Instanciamos el hook
  const navigation = useNavigation()

  // Cargando las fonts
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View>
        {size(recipes) > 0 ? (
          <FlatList
            data={recipes}
            renderItem={(recipe) => <Recipe recipe={recipe} navigation={navigation} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            ListFooterComponent={<FooterList isLoading={isLoading} />}
          />
        ) : (
          <View style={styles.loaderRecipes}>
            <ActivityIndicator size='large' />
            <Text>Cargando recetas...</Text>
          </View>
        )}
      </View>
    )
  }
}

function Recipe (props) {
  const { recipe, navigation } = props
  const {
    id,
    name
    // ingredients
  } = recipe.item

  // const showIngredient = () => {
  //   return ingredients.map((ingredient, i) => {
  //     return (
  //       <Text key={i}>{ingredient.ingredient}</Text>
  //     )
  //   })
  // }

  const goRecipe = () => {
    navigation.navigate('recipe', {
      // Le enviamos el id a la screen para asi poder realizar la petición a firebase y mostrar los datos
      id,
      // Le enviamos el nombre para que cuando se abra la screen de la receta se muestre el nombre
      name
    })
  }
  return (
    <TouchableOpacity onPress={goRecipe}>
      <View style={styles.viewRecipe}>
        <Text style={styles.recipeName}>{name}</Text>
        {/* <Text style={styles.recipeName}>Sopa de tomate</Text> */}
        {/* {showIngredient()} */}
      </View>

    </TouchableOpacity>

  )
}
function FooterList (props) {
  const { isLoading } = props
  // console.log(isLoading)

  if (isLoading) {
    return (
      <View style={styles.loaderRecipes}>
        <ActivityIndicator size='large' />
        <Text>Cargando</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.endOfRecipes}>
        <Text>Son todos</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  // loaderRecipes: {
  //   // marginTop: 10,
  //   // marginBottom: 80,
  //   // marginRight: 30,
  //   // alignItems: 'center'
  // },
  viewRecipe: {
    flex: 1,
    // backgroundColor: '#fff',
    width: '70%',
    height: 60,
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 25,
    shadowOffset: {
      width: -12,
      height: -12
    },
    shadowOpacity: 1,
    shadowRadius: 61,
    shadowColor: '#000',
    elevation: 10,
    backgroundColor: '#F1F3F4',
    paddingLeft: 30,
    fontSize: 18,
    letterSpacing: 2,
    color: '#454648'
  },
  recipeName: {
    // fontWeight: 'bold'
    fontFamily: 'Montserrat_500Medium'
  }
  // endOfRecipes: {
  //   // marginTop: 10,
  //   // marginBottom: 80,
  //   // alignItems: 'center'
  // }
})
