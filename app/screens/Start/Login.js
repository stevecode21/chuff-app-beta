import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
// Esto será una linea para dividir una cosa de la otra
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import ImageStart from '../../components/ImageStart/ImageStart'

export default function Login () {
  return (
    <ScrollView style={styles.viewBody}>
      <ImageStart />
      <View style={styles.viewContainerLogin}>
        <Text>Iniciar Sesión</Text>
        <Register />
      </View>
      <Divider style={styles.dividerLine} />
      <Text>Social Login</Text>
      <Text>Beta</Text>
    </ScrollView>
  )
}
/* Por ahora crearemos un componente interno para la creación de la cuenta */
function Register () {
  const navigation = useNavigation()
  return (
    <Text style={styles.textAnnouncementRegister}>
      ¿No tienes cuenta?{' '}
      <Text
        style={styles.btnAnnouncementRegister}
        onPress={() => navigation.navigate('register')}
      >
        Crear cuenta
      </Text>
    </Text>
  )
}
const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: '#fff'
  },
  viewContainerLogin: {
    marginRight: 40,
    marginLeft: 40
  },
  textAnnouncementRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnAnnouncementRegister: {
    color: '#454648',
    fontWeight: 'bold'
  },
  dividerLine: {
    backgroundColor: 'rgba(69, 70, 72, 0.1)',
    margin: 40
  }
})
