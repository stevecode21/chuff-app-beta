import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from 'lodash'

export const ListRecipes = ({ recipes, handleLoadMore, isLoading }) => {
  return (
    <View>
      {size(recipes) > 0 ? (
        <FlatList
          data={recipes}
          renderItem={(recipe) => <Recipe recipe={recipe} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={}
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
          {showIngredient()}
        </View>
      </View>
    </TouchableOpacity>

  )
}
function FooterList(props){
  const {isLoading } = props
  if(isLoading){
    return <View style={styles.loaderRecipes}><ActivityIndicator size='large'/></View>
  } else{
    return (
    <View style={styles.endOfRecipes}>
      <Text>¡Esas son todas!</Text>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  loaderRecipes: {
    marginTop: 40,
    marginBottom: 10,
    marginRight: 30,
    alignItems: 'center'
  },
  viewRecipe: {
    flexDirection: 'row',
    margin: 10
  },
  recipeName: {
    fontWeight: 'bold'
  },
  endOfRecipes:{
    marginTop: 10,
    marginBottom:20,
    alignItems: 'center'
  }
})
