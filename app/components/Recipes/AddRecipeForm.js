import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, Dimensions } from 'react-native'
import { Icon, Avatar, Button } from 'react-native-elements'
// import { ItemRecipe } from '../Item/ItemRecipe'
import { size } from 'lodash'
import firebase from 'firebase/app'
import firebaseApp from '../../utils/firebase'

// Importo el firestore de mi app
import 'firebase/firestore'
import { Container } from 'native-base'

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
  // <ScrollView style={styles.scrollView}>
  // {/* <Container> */}
  // <View styles={styles.viewBody}>

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View styles={{ flex: 1 }}>
        {/* <View style={styles.containerTitle}> */}
        <Text style={styles.title}>Crear Receta</Text>
        {/* </View> */}
        {/* <View style={styles.containerForm}> */}
        {/* <Text>Form</Text> */}
        <FormAdd
          setRecipeName={setRecipeName}
          setIngredients={setIngredients}
          setSteps={setSteps}
          ingredients={ingredients}
          steps={steps}
          toastRef={toastRef}
          addRecipe={addRecipe}
        />
        {/* </View> */}
        <View style={styles.containerBtn}>
          <Button
            title='Crear'
            onPress={addRecipe}
            containerStyle={styles.createButtonContainer}
            buttonStyle={styles.createButton}
            accessibilityLabel='Press'
          />
        </View>
      </View>
    </ScrollView>

  // </View>
  // {/* </Container> */}
  // </ScrollView>
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
    <View contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerName}>
        <TextInput
          placeholder='Nombra tu receta'
          style={styles.inputFormName}
          onChange={e => setRecipeName(e.nativeEvent.text)}
        />
      </View>
      <View style={styles.containerFormIngredients}>
        <View style={styles.containerSubtitles}>
          <Text style={styles.subTitles}>Ingredientes</Text>
        </View>
        {/* <ItemRecipe multiline={false} /> */}
        {ingredients.map((ingredient, idx) => {
          return (
            <View style={styles.containerInputs} key={`${ingredient}-${idx}`}>

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
        <View style={styles.containerAddBtn}>
          <Button title='+' onPress={() => handleAdd()} />
        </View>
      </View>
      <View style={styles.containerFormIngredients}>
        <View style={styles.containerSubtitles}>
          <Text style={styles.subTitles}>Preparación</Text>
        </View>
        {steps.map((step, idx) => {
          return (
            <View key={`${step}-${idx}`} style={styles.containerInputs}>

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
        <View style={styles.containerAddBtn}>
          <Button title='+' onPress={() => handleAddStep()} />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({

  containerTitle: {
    // backgroundColor: 'red',
    height: '20%',
    justifyContent: 'center',
    paddingLeft: 50
  },
  title: {
    fontSize: 25
    // fontWeight: 'bold'
  },
  containerForm: {
    // backgroundColor: 'yellow',
    height: '70%'
    // paddingLeft: 40,
    // paddingRight: 40,
    // paddingTop: 20
  },
  containerName: {
    // backgroundColor: 'green',
    padding: 30

  },
  inputFormName: {
    fontSize: 20
  },
  containerFormIngredients: {
    // backgroundColor: 'blue'
    // padding: 30
  },
  containerSubtitles: {
    // backgroundColor: 'yellow',
    margin: 20
  },
  subTitles: {
    fontSize: 18
  },
  containerInputs: {
    backgroundColor: 'red',
    marginLeft: 40,
    marginRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  textInputsIngredients: {
    // backgroundColor: 'yellow',
    width: '80%',
    alignItems: 'center'
    // padding: 4
  },
  deleteButton: {
    width: 40
    // height: 20

  },
  deleteButtonBtn: {
    borderRadius: 50
  },
  containerBtn: {
    backgroundColor: 'green',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  containerAddBtn: {
    backgroundColor: 'green',
    margin: 10
  },
  createButtonContainer: {
    width: '70%'
  },
  createButton: {

  }

})
