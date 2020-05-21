import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, Dimensions } from 'react-native'
import { Icon, Avatar, Button } from 'react-native-elements'
// import { ItemRecipe } from '../Item/ItemRecipe'
import { size } from 'lodash'
import firebase from 'firebase/app'
import firebaseApp from '../../utils/firebase'

// Importo el firestore de mi app
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)
export default function AddRecipeForm (props) {
  const { toastRef, setIsLoading, navigation } = props
  // States
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([{ ingredient: null }])
  const [steps, setSteps] = useState([{ step: null }])

  const isIngredientValid = (ingredient) => {
    return (ingredient.ingredient || ingredients.ingredient === null || ingredients.ingredient === '')
  }

  const isStepValid = (step) => {
    return (step.step || steps.step === null || steps.step === '')
  }

  const addRecipe = () => {
    if (!recipeName || !ingredients.every(isIngredientValid) || !steps.every(isStepValid)) {
      toastRef.current.show('No puedes dejar campos en blanco!')
    } else if (size(ingredients) === 0 || size(steps) === 0) {
      toastRef.current.show('Debes agregar al menos un ingrediente y un paso')
    } else {
      setIsLoading(true)
      db.collection('recipes')
        .add({
          name: recipeName,
          ingredients: ingredients,
          steps: steps,
          createAt: new Date(),
          createBy: firebase.auth().currentUser.uid
        })
        .then(() => {
          setIsLoading(false)
          navigation.navigate('recipes')
        }).catch(() => {
          setIsLoading(false)
          toastRef.current.show('No se ha podido subir la receta')
        })
      // console.log('ok')
      // console.log(ingredients)
      // console.log(steps)
    }
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View styles={styles.viewBody}>
        <Text>Crear Receta</Text>
        <FormAdd
          setRecipeName={setRecipeName}
          setIngredients={setIngredients}
          setSteps={setSteps}
          ingredients={ingredients}
          steps={steps}
          toastRef={toastRef}
          addRecipe={addRecipe}
        />
        <Button
          title='Crear'
          onPress={addRecipe}
          containerStyle={styles.createButton}
        />
      </View>
    </ScrollView>
  )
}
function FormAdd (props) {
  const { steps, ingredients, setRecipeName, setIngredients, setSteps, addRecipe } = props

  const handleChange = (i, event) => {
    const values = [...ingredients]
    values[i].ingredient = event
    setIngredients(values)
  }

  const handleAdd = () => {
    const values = [...ingredients]
    values.push({ ingredient: null })
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
    values.push({ step: null })
    setSteps(values)
  }
  const handleRemoveStep = (i) => {
    const values = [...steps]
    values.splice(i, 1)
    setSteps(values)
  }
  return (
    <View style={styles.viewForm}>
      <TextInput
        placeholder='Nombra tu receta'
        style={styles.inputFormName}
        onChange={e => setRecipeName(e.nativeEvent.text)}
      />
      <View>
        <Text style={styles.subTitles}>Ingredientes</Text>
        {/* <ItemRecipe multiline={false} /> */}
        {ingredients.map((ingredient, idx) => {
          return (
            <View style={styles.inputs} key={`${ingredient}-${idx}`}>

              <TextInput
                style={styles.textInputsIngredients}
                placeholder='Ingrediente'
                // value={ingredient.value || ''}
                onChange={e => handleChange(idx, e.nativeEvent.text)}
              />
              <Button title='x' onPress={() => handleRemove(idx)} containerStyle={styles.deleteButton} buttonStyle={styles.deleteButtonBtn} />

            </View>
          )
        })}
        <Button title='+' onPress={() => handleAdd()} />
      </View>
      <View>
        <Text style={styles.subTitles}>Preparación</Text>
        {steps.map((step, idx) => {
          return (
            <View key={`${step}-${idx}`} style={styles.inputs}>

              <TextInput
                style={styles.textInputsIngredients}
                placeholder='Agrega un paso'
                // value={step.value || ''}
                onChange={e => handleChangeStep(idx, e.nativeEvent.text)}
                multiline
              />
              <Button title='x' onPress={() => handleRemoveStep(idx)} containerStyle={styles.deleteButton} buttonStyle={styles.deleteButtonBtn} />

            </View>
          )
        })}
        <Button title='+' onPress={() => handleAddStep()} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  // scrollView: {
  //   height: '100%',
  //   paddingTop: 50,
  //   backgroundColor: '#fff'
  // },
  viewBody: {
    flex: 1
    // height: '100%'
  },
  viewForm: {
    padding: 50
  },
  inputFormName: {
    backgroundColor: '#F1F3F4',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold'
  },
  subTitles: {
    marginTop: 20
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20
  },
  textInputsIngredients: {
    overflow: 'scroll',
    width: '90%'
    // backgroundColor: 'red'
  },
  deleteButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButtonBtn: {
    borderRadius: 50,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center'
  },
  createButton: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
})
