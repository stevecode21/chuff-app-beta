import React from 'react'
import { Image, StyleSheet } from 'react-native'
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
  logo: {
    width: '100%',
    height: 150,
    marginTop: 60
  }
})
