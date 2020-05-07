import React from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
// Esto será una linea para dividir una cosa de la otra
import { Divider } from 'react-native-elements'
export default function Login () {
  return (
    <ScrollView style={styles.viewBody}>
      <Image
      // El source de la iamgen
        source={require('../../../assets/img/LogoChuff.png')}
        resizeMode='contain'
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
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
  return (
    <Text style={styles.textAnnouncementRegister}>
      ¿No tienes cuenta?{' '}
      <Text
        style={styles.btnAnnouncementRegister}
        onPress={() => console.log('Crear cuenta')}
      >
        Crear cuenta
      </Text>
    </Text>
  )
}
const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 100,
    marginTop: 20
  },
  viewBody: {
    // paddingTop: 30,
    backgroundColor: '#fff'
  },
  viewContainer: {
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
