import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const BetaText = () => {
  return (

    <Text style={styles.textBeta}>Beta</Text>

  )
}
const styles = StyleSheet.create({

  textBeta: {
    fontSize: 22,
    letterSpacing: 10,
    color: '#454648',
    textAlign: 'center'
  }
})
