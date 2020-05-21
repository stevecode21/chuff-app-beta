import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Container } from 'native-base'
import { Row, Grid } from 'react-native-easy-grid'

import Toast from 'react-native-easy-toast'
import ImageStart from '../../components/ImageStart/ImageStart'
import LoginForm from '../../components/Start/LoginForm'
import { BetaText } from '../../components/BetaText/BetaText'

export default function Login () {
  const toastRef = useRef()
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: '#fff', flex: 1 }}>
      <Container>
        <Grid>
          <Row style={styles.rowImage}>
            <ImageStart />
          </Row>
          <Row style={styles.rowForm}>
            <LoginForm toastRef={toastRef} />
          </Row>
          <Row style={styles.rowBeta}>
            <BetaText />
          </Row>
          <Toast ref={toastRef} position='top' opacity={0.9} />
        </Grid>
      </Container>
    </KeyboardAwareScrollView>
  )
}
/* Por ahora crearemos un componente interno para la creación de la cuenta */
function Register () {
  const navigation = useNavigation()
  return (
    <View style={styles.textRegister}>
      <Text style={styles.textAnnouncementRegister}>
        ¿No tienes cuenta?{' '}

        <Text
          style={styles.btnAnnouncementRegister}
          onPress={() => navigation.navigate('register')}
        >
          Crear cuenta
        </Text>
      </Text>
    </View>

  )
}
const styles = StyleSheet.create({
  rowImage: {
    paddingTop: 30,
    height: '35%'
  },
  rowForm: {
    // backgroundColor: 'green',
    height: '55%'
  },
  rowBeta: {
    // backgroundColor: 'red',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
