import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from 'lodash'

export const ListRecipes = ({ recipes, handleLoadMore, isLoading }) => {
  return (
    <View>
      {size(recipes) > 0 ? (
        <FlatList
          data={recipes}
          renderItem={(recipe) => (
            <Recipe recipe={recipe} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList handleLoadMore={handleLoadMore} isLoading={isLoading} />}
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

function Recipe (props) {
  const { recipe } = props
  const { name, ingredients } = recipe.item

  const showIngredient = () => {
    return ingredients.map((ingredient, i) => {
      return (
        <Text key={i}>{ingredient.ingredient}</Text>
      )
    })
  }

  const goRecipe = () => {
    console.log('Ok!!')
  }
  return (
    <TouchableOpacity onPress={goRecipe}>
      <View style={styles.viewRecipe}>
        <View>
          <Text style={styles.recipeName}>{name}</Text>
          {/* {showIngredient()} */}
        </View>
      </View>
    </TouchableOpacity>

  )
}
function FooterList (props) {
  const { handleLoadMore, isLoading } = props
  console.log(isLoading)

  if (isLoading) {
    // return <View style={styles.loaderRecipes}><ActivityIndicator size='large' /></View>
    return <View style={styles.loaderRecipes}><Text style={styles.recipeName}>Cargando...</Text></View>
    // return <TouchableOpacity onPress={handleLoadMore}><Text style={styles.recipeName}>Cargar mas</Text></TouchableOpacity>
  } else {
    return (
      <View style={styles.endOfRecipes}>
        <Text>¡Esas son todas!</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  loaderRecipes: {
    marginTop: 10,
    marginBottom: 80,
    marginRight: 30,
    alignItems: 'center'
  },
  viewRecipe: {
    flexDirection: 'row',
    padding: 30
  },
  recipeName: {
    fontWeight: 'bold'
  },
  endOfRecipes: {
    marginTop: 10,
    marginBottom: 80,
    alignItems: 'center'
  }
})