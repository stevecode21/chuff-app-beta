import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
// Importo un Button desde React native elements
import { Button } from 'react-native-elements'
import { Video } from 'expo-av'
import { BetaText } from '../../components/BetaText/BetaText'

export const StartingMessage = ({ navigation }) => {
  return (
    // <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
      <View style={styles.betaContainer}>
        <BetaText />
      </View>
    </View>
    // </ScrollView>

  )
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerVideo: {
    flexDirection: 'row',
    flex: 4,
    marginVertical: 20
  },
  viewBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 4,
    marginHorizontal: 30
  },
  betaContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1
  },
  videoStarting: {
    width: '100%'
  },
  btnStyle: {
    backgroundColor: '#454648',
    padding: 15,
    borderRadius: 5
  },
  btnContainer: {
    width: '70%',
    marginVertical: 30,
    alignContent: 'center',
    justifyContent: 'center'
  }
})
