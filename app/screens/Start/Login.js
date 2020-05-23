import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'

import Toast from 'react-native-easy-toast'
import ImageStart from '../../components/ImageStart/ImageStart'
import LoginForm from '../../components/Start/LoginForm'
import { BetaText } from '../../components/BetaText/BetaText'

export default function Login () {
  const toastRef = useRef()
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Container>
        <View style={styles.viewBody}>
          <View style={styles.containerImage}>
            <ImageStart />
          </View>
          <View style={styles.containerForm}>
            <LoginForm toastRef={toastRef} />
          </View>
          <Register />
          <View style={styles.containerBeta}>
            <BetaText />
          </View>
          <Toast ref={toastRef} position='bottom' opacity={0.9} />
        </View>
      </Container>
    </KeyboardAwareScrollView>

  )
}
/* Por ahora crearemos un componente interno para la creación de la cuenta */
function Register () {
  const navigation = useNavigation()
  return (
    <View style={styles.containerTextRegister}>
      <Text style={styles.textAnnouncementRegister}>
        ¿No tienes cuenta?{' '}

        <Text
          style={styles.btnAnnouncementRegister}
          onPress={() => navigation.navigate('register')}
        >
          Crear cuenta
        </Text>
      </Text>
    </View>

  )
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  containerImage: {
    // backgroundColor: 'red',
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerForm: {
    // backgroundColor: 'blue',
    flex: 4
  },
  containerBeta: {
    // backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerTextRegister: {
    flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center'
  },
  btnAnnouncementRegister: {
    fontWeight: 'bold'
  }
})
