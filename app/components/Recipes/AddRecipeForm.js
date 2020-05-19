import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, Dimensions } from 'react-native'
import { Icon, Avatar, Button } from 'react-native-elements'
// import { ItemRecipe } from '../Item/ItemRecipe'
import { size, includes } from 'lodash'
import firebase from 'firebase/app'
import firebaseApp from '../../utils/firebase'

// Importo el firestore de mi app
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)
export default function AddRecipeForm (props) {
  const { toastRef, setIsLoading, navigation } = props
  // States
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])

  const addRecipe = () => {
    if (!recipeName || ingredients.includes(null) || steps.includes(null)) {
      toastRef.current.show('No puedes dejar campos en blanco!')
    } else if (size(ingredients) === 0 || size(steps) === 0) {
      toastRef.current.show('Debes agregar al menos un ingrediente y un paso')
    } else {
      // setIsLoading(true)
      // db.collection('recipes')
      //   .add({
      //     name: recipeName,
      //     ingredients: { ingredients },
      //     steps: steps,
      //     createAr: new Date(),
      //     createBy: firebase.auth().currentUser.uid
      //   })
      console.log('ok')
      console.log(ingredients)
      console.log(steps)

      // .then(() => {
      //   setIsLoading(false)
      //   // console.log('ok')
      // }).catch(() => {
      //   setIsLoading(false)
      //   toastRef.current.show('No se ha podido subir la receta')
      // })
    }
    // console.log(ingredients)
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Text>Crear Receta</Text>
      <FormAdd
        setRecipeName={setRecipeName}
        setIngredients={setIngredients}
        setSteps={setSteps}
        ingredients={ingredients}
        steps={steps}
      />
      <Button
        title='Crear'
        onPress={addRecipe}
      />
    </ScrollView>
  )
}
function FormAdd (props) {
  const { steps, ingredients, setRecipeName, setIngredients, setSteps } = props

  const handleChange = (i, event) => {
    const values = [...ingredients]
    values[i].ingredient = event
    setIngredients(values)
  }

  const handleAdd = () => {
    const values = [...ingredients]
    values.push({ ingredients: null })
    setIngredients(values)
  }
  const handleRemove = (i) => {
    const values = [...ingredients]
    values.splice(i, 1)
    setIngredients(values)
  }
  /* Steps */
  const handleChangeStep = (i, event) => {
    const values = [...steps]
    values[i].step = event
    setSteps(values)
  }

  const handleAddStep = () => {
    const values = [...steps]
    values.push({ steps: null })
    setSteps(values)
  }
  const handleRemoveStep = (i) => {
    const values = [...steps]
    values.splice(i, 1)
    setSteps(values)
  }
  return (
    <View style={styles.vewForm}>
      <TextInput
        placeholder='Nombra tu receta'
        style={styles.inputFormName}
        onChange={e => setRecipeName(e.nativeEvent.text)}
      />
      <View>
        <Text>Ingredientes</Text>
        {/* <ItemRecipe multiline={false} /> */}
        {ingredients.map((ingredient, idx) => {
          return (
            <View key={`${ingredient}-${idx}`}>

              <TextInput
                placeholder='Ingrediente'
                value={ingredient.value}
                onChange={e => handleChange(idx, e.nativeEvent.text)}
              />
              <Button title='x' onPress={() => handleRemove(idx)} />

            </View>
          )
        })}
        <Button title='+' onPress={() => handleAdd()} />
      </View>
      <View>
        <Text>Preparación</Text>
        {steps.map((step, idx) => {
          return (
            <View key={`${step}-${idx}`}>

              <TextInput
                placeholder='Ingrediente'
                value={step.value}
                onChange={e => handleChangeStep(idx, e.nativeEvent.text)}
              />
              <Button title='x' onPress={() => handleRemoveStep(idx)} />

            </View>
          )
        })}
        <Button title='+' onPress={() => handleAddStep()} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    paddingTop: 50,
    backgroundColor: '#fff'
  },
  vewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  inputFormName: {
    backgroundColor: '#F1F3F4',
    marginBottom: 10
  }
})
