import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
export default function ImageStart () {
  return (

    <Image
      // El source de la imagen
      source={require('../../../assets/img/LogoChuff.png')}
      resizeMode='contain'
      style={styles.logo}
    />

  )
}

const styles = StyleSheet.create({
  // containerImage: {
  //   // flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // backgroundColor: 'red',
  //   width: '100%',
  //   height: '30%'
  //   // paddingTop: '10%'
  // },
  logo: {
    width: '100%',
    // backgroundColor: 'red',
    height: 170
  }
})
