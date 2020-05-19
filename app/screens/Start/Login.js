import React, { useRef } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
// Esto será una linea para dividir una cosa de la otra
// import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-easy-toast'
import ImageStart from '../../components/ImageStart/ImageStart'
import LoginForm from '../../components/Start/LoginForm'
import { BetaText } from '../../components/BetaText/BetaText'
export default function Login () {
  const toastRef = useRef()
  return (
    // <KeyboardAwareScrollView>
    <View style={styles.viewBody}>
      {/* <KeyboardAwareScrollView style={styles.viewBody}> */}
      <View style={styles.containerImage}>
        <ImageStart />
      </View>
      <View style={styles.viewContainerLogin}>
        <LoginForm toastRef={toastRef} />
        <Register />
      </View>
      <View style={styles.viewContainerBetaText}>
        <BetaText />
      </View>
      <Toast ref={toastRef} position='top' opacity={0.9} />
      {/* </KeyboardAwareScrollView> */}
    </View>
    // {/* </KeyboardAwareScrollView> */}
  )
}
/* Por ahora crearemos un componente interno para la creación de la cuenta */
function Register () {
  const navigation = useNavigation()
  return (
    <>
      <Text style={styles.textAnnouncementRegister}>
        ¿No tienes cuenta?{' '}

        <Text
          style={styles.btnAnnouncementRegister}
          onPress={() => navigation.navigate('register')}
        >
          Crear cuenta
        </Text>
      </Text>
    </>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    // height: '100%'
  },
  viewBody: {
    backgroundColor: '#fff',
    flex: 1,
    minHeight: '100%'
  },
  containerImage: {
    // backgroundColor: 'yellow',
    // height: '35%',
    justifyContent: 'center'
    // alignContent: 'center'
  },
  viewContainerLogin: {
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'column',
    width: '100%',
    height: '55%'
    // paddingRight: '10%',
    // paddingLeft: '10%',
    // paddingTop: '5%'
  },
  containerTextAnnouncementRegister: {
    // backgroundColor: 'green',
    width: '100%',

    paddingTop: 25

  },
  textAnnouncementRegister: {
    fontWeight: '100'
  },
  btnAnnouncementRegister: {
    color: '#454648',
    fontWeight: 'bold'
  },
  viewContainerBetaText: {
    // backgroundColor: 'green',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
