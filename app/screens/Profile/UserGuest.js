import React from 'react'
// ScrollView le permitirá al usuario hacer scroll en la pantalla en caso tal de que el contenido de la screen sobrepase el alto de la pantalla
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
// Importo un Button desde React native elements
import { Button } from 'react-native-elements'
// Usare este hook que me provee react navigation para la funcionalidad del botón de 'empezar'
import { useNavigation } from '@react-navigation/native'
export default function UserGuest () {
  // Usamos el hook useNavigation aquí
  const navigation = useNavigation()
  console.log(navigation)

  return (
    <ScrollView centerContent style={styles.viewBody}>
      <Image
        source={require('../../../assets/img/LogoChuff.png')}
        resizeMode='contain'
        style={styles.image}
      />
      <Text style={styles.title}>CHÜFF - Comamos Juntos</Text>
      <Text style={styles.description}>La mejor comunidad para comer en familia! Comparte recetas, crea eventos y come rico!</Text>
      <View style={styles.viewBtn}>
        <Button
          title='Empezar'
          // Estilos para el botón
          buttonStyle={styles.btnStyle}
          // Estilos para el botón del contenedor
          containerStyle={styles.btnContainer}
          // Evento en cuanto el usuario presiona el botón el hook de navigation lo llevará al screen del login
          onPress={() => navigation.navigate('login')}

        />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  viewBody: {
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 40
  },
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
    flex: 1,
    alignItems: 'center'
  },
  btnStyle: {
    backgroundColor: '#454648'
  },
  btnContainer: {
    width: '70%'
  }

})
