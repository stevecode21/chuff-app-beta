import React from 'react'
import { StyleSheet, View } from 'react-native'
// Importo un Button desde React native elements
import { Button } from 'react-native-elements'

import { Video } from 'expo-av'
import { BetaText } from '../../components/BetaText/BetaText'

export const StartingMessage = ({ navigation }) => {
  return (
    <View style={styles.viewBody}>
      <View style={styles.containerVideo}>
        <Video
          source={require('../../../assets/videos/logo-animation-chuff.mp4')}
          isMuted
          resizeMode='cover'
          shouldPlay
          isLooping
          style={styles.videoStarting}
        />
      </View>

      <View style={styles.viewBtn}>

        <Button
          title='Iniciar Sesión'
          onPress={() => navigation.push('login')}
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
        />
        <Button
          title='Registrarse'
          onPress={() => navigation.push('register')}
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
        />

      </View>
      <BetaText />
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: '#FFFFFF',
    height: '100%'
  },
  containerVideo: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '50%'
  },
  videoStarting: {
    width: '100%',
    height: '100%'
  },
  viewBtn: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: '40%'
  },
  btnStyle: {
    backgroundColor: '#454648',
    padding: 15,
    borderRadius: 5
  },
  btnContainer: {
    width: '70%',
    margin: 15,
    alignContent: 'center',
    justifyContent: 'center'
  }
})
