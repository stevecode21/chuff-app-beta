import React from 'react'
// ScrollView le permitirá al usuario hacer scroll en la pantalla en caso tal de que el contenido de la screen sobrepase el alto de la pantalla
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
// Importo un Button desde React native elements
import { Button } from 'react-native-elements'
// Usare este hook que me provee react navigation para la funcionalidad del botón de 'empezar'
// import { useNavigation } from '@react-navigation/native'
import { Video } from 'expo-av'

export const StartingMessage = ({ navigation }) => {
  // Usamos el hook useNavigation aquí
  // const navigation = useNavigation()
  // console.log(navigation)

  return (
    // <ScrollView centerContent style={styles.viewBody}>
    <View style={styles.viewBody}>
      <View style={styles.containerVideo}>
        <Video
          source={require('../../../assets/videos/logo-animation-chuff.mp4')}
          isMuted
          resizeMode='cover'
          shouldPlay
          isLooping
          style={{ width: 400, height: 400 }}
        />
      </View>
      {/* <Image
        source={require('../../../assets/img/LogoChuff.png')}
        resizeMode='contain'
        style={styles.image}
      /> */}
      {/* <Text style={styles.title}>CHÜFF - Comamos Juntos</Text> */}
      {/* <Text style={styles.description}>La mejor comunidad para comer en familia! Comparte recetas, crea eventos y come rico!</Text> */}
      <View style={styles.viewBtn}>
        {/* <Button
          title='Empezar'
          // Estilos para el botón
          buttonStyle={styles.btnStyle}
          // Estilos para el botón del contenedor
          containerStyle={styles.btnContainer}
          // Evento en cuanto el usuario presiona el botón el hook de navigation lo llevará al screen del login
          onPress={() => navigation.navigate('login')}

        /> */}
        <Button
          title='Iniciar Sesión' onPress={() => navigation.push('login')} buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer}
        />
        <Button
          title='Registrarse' onPress={() => navigation.push('register')} buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer}
        />
      </View>
      <View style={styles.containerTextBeta}>
        <Text style={styles.textBeta}>BETA</Text>
      </View>
    </View>
    // </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    // paddingTop: 10,
    backgroundColor: '#fff'

  },
  containerVideo: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    height: '50%'
  },
  // image: {
  //   height: 300,
  //   width: '100%',
  //   marginBottom: 40
  // },
  title: {
    fontWeight: 'bold',
    fontSize: 19,
    marginBottom: 10,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    marginBottom: 20
  },
  viewBtn: {
    // flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    alignContent: 'center',
    height: '40%'
  },
  btnStyle: {
    backgroundColor: '#454648',
    // height: '90%'
    padding: 15,
    borderRadius: 5
  },
  btnContainer: {
    width: '70%',
    // height: 900
    margin: 15,
    // borderRadius: 100
    alignContent: 'center',
    justifyContent: 'center'
  },
  containerTextBeta: {
    // backgroundColor: 'green',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  textBeta: {
    fontSize: 22,
    letterSpacing: 10,
    color: '#454648'
  }
})
