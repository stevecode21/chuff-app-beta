import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
export default function ImageStart () {
  return (

    <Image
      source={require('../../../assets/img/LogoChuff.png')}
      resizeMode='contain'
      style={styles.logo}
    />

  )
}

const styles = StyleSheet.create({

  logo: {
    width: '100%',
    height: 160
  }
})
