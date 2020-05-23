import React, { useState, useRef } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading/Loading'
import AddRecipeForm from '../../components/Recipes/AddRecipeForm'
export default function AddRecipe ({ navigation }) {
  // State para el loading
  const [isLoading, setIsLoading] = useState(false)
  // ref hook para el toast
  const toastRef = useRef()

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      {/* A este componente form de recipes, le envio props para el loading, toast y la navegación que debe llevar */}
      <AddRecipeForm toastRef={toastRef} setIsLoading={setIsLoading} navigation={navigation} />
      <Toast ref={toastRef} position='bottom' opacity={0.9} />
      <Loading isVisible={isLoading} />
    </View>
  )
}
