import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// Importamos el componente que nos permitirá realizar toast de manera sencilla
import Toast from 'react-native-easy-toast'

import ImageStart from '../../components/ImageStart/ImageStart'
import { RegisterForm } from '../../components/Start/RegisterForm'

export default function Register () {
  // Creamos una constante para inicilizar el hook useRef que es el que vamos a usar para mi componente Toast y así darle una referencia para su ejecución
  const toastRef = useRef()
  return (
    <KeyboardAwareScrollView style={styles.viewBody}>
      <ImageStart />
      <View style={styles.viewContainerRegister}>
        {/* A registerForm le voy a pasar por props la referencia del toast */}
        <RegisterForm toastRef={toastRef} />
      </View>
      {/* Llamamos el Toast y le damos propiedades como la referencia toastRef para decirle cuando se debe mostrar y lo centramos con position */}
      <Toast ref={toastRef} position='top' opacity={0.9} />
      {/* <View style={styles.containerViewMessage}>
        <Text>Beta</Text>
      </View> */}
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: '#fff'
  },
  viewContainerRegister: {
    marginRight: 40,
    marginLeft: 40,
    shadowColor: '#000'
  }
  // containerViewMessage: {
  //   height: '100',
  //   flex: 3,
  //   backgroundColor: 'red'

  // }

})
