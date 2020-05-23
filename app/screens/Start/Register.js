import React, { useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container } from 'native-base'
// Importamos el componente que nos permitirá realizar toast de manera sencilla
import Toast from 'react-native-easy-toast'
import ImageStart from '../../components/ImageStart/ImageStart'
import { RegisterForm } from '../../components/Start/RegisterForm'
import { BetaText } from '../../components/BetaText/BetaText'

export default function Register () {
  // Creamos una constante para inicilizar el hook useRef que es el que vamos a usar para mi componente Toast y así darle una referencia para su ejecución
  const toastRef = useRef()
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Container>
        <View style={styles.viewBody}>
          <View style={styles.containerImage}>
            <ImageStart />
          </View>
          <View style={styles.containerForm}>
            {/* A registerForm le voy a pasar por props la referencia del toast */}
            <RegisterForm toastRef={toastRef} />
          </View>
          <Login />
          {/* Llamamos el Toast y le damos propiedades como la referencia toastRef para decirle cuando se debe mostrar y lo centramos con position */}
          <Toast ref={toastRef} position='bottom' opacity={0.9} />
          <View style={styles.containerBeta}>
            <BetaText />
          </View>
        </View>
      </Container>
    </KeyboardAwareScrollView>
  )
}
function Login () {
  const navigation = useNavigation()
  return (
    <View style={styles.containerTextLogin}>
      <Text style={styles.textAnnouncementRegister}>
        ¿Ya tienes cuenta?{' '}

        <Text
          style={styles.btnAnnouncementLogin}
          onPress={() => navigation.navigate('login')}
        >
          Inicia Sesión
        </Text>
      </Text>
    </View>

  )
}
const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  containerImage: {
    // backgroundColor: 'navy',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerForm: {
    flex: 4
    // backgroundColor: 'blue'
  },
  containerBeta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor: 'green'
  },
  containerTextLogin: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10
  },
  btnAnnouncementLogin: {
    fontWeight: 'bold'
  }
})
