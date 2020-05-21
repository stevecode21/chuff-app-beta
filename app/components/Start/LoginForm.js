import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { isEmpty } from 'lodash'
// Importo firebase para la autenticación de login
import * as firebase from 'firebase'
// Importamos la función que se ocupa de validar email
import { validateEmail } from '../../utils/Validations'
import Loading from '../Loading/Loading'
import { Col, Row, Grid } from 'react-native-easy-grid'
import { Container, Header, Content, Form, Item, Input } from 'native-base'

export default function LoginForm (props) {
  const { toastRef } = props
  // Estado para mostrar u ocultar contraseña
  const [showPassword, setShowPassword] = useState(false)
  // Estado para almacenar el formData del login
  const [formData, setFormData] = useState(defaultFormValue())
  // State del loading
  const [loading, setLoading] = useState(false)
  // Función creada para el onChange para actualizar nuestro estado, e me devuelve el valor que se está ingresando en el input y type el tipo de dato del input
  const onChange = (e, type) => {
    // console.log(e.nativeEvent.text)
    // console.log(type)
    // Con el spreadoperator obtengo los valores actuales de nuestro estado, y le decimos que queremos actualizar el dato que obtengo por el evento de acuerdo a su tipo (email o password)
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show('No olvides llenar todos los campos')
      // Si lo que devuelve validation email es false (que no está correcto el email, mandará un toast)
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show('El correo electrónico no es correcto')
    } else {
      setLoading(true)
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          toastRef.current.show('Email o contraseña incorrecta')
        })
    }
  }

  return (

    <Container>
      <Content>
        <Form style={styles.formContainerLogin}>
          {/* <Col style={{ backgroundColor: 'blue' }}> */}
          {/* <View style={styles.formContainerLogin}> */}

          <Text style={styles.titleLogin}>Iniciar Sesión</Text>

          <Input
            style={styles.inputFormLogin}
            placeholder='E-mail'
            onChange={(e) => onChange(e, 'email')}
            placeholderTextColor='gray'
          />

          <Input
            underline={false}
            style={styles.inputFormLogin}
            placeholder='Contraseña'
            placeholderTextColor='gray'
            onChange={(e) => onChange(e, 'password')}
            password
            secureTextEntry={!showPassword}
            rightIcon={
              <Icon
                type='material-community'
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                iconStyle={styles.iconRight}
                // Un evento on press para que el estado se cambie con el valor diferente al que tenga actualmente showPassword
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          <Button
            title='Iniciar Sesión'
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={onSubmit}
          />
          <Loading isVisible={loading} />
          {/* </Row> */}
          {/* </Col> */}
        </Form>
      </Content>
    </Container>

  )
}
const defaultFormValue = () => {
  return (
    {
      email: '',
      password: ''
    }
  )
}
const styles = StyleSheet.create({
  formContainerLogin: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'red',
    width: '100%',
    // height: '100%',
    paddingLeft: 20,
    paddingRight: 20

  },
  titleLogin: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 5,
    color: '#454648'
  },
  inputFormLogin: {
    borderColor: 'red',
    width: '90%',
    height: 49,
    borderRadius: 12,
    marginTop: 20,
    backgroundColor: '#F1F3F4',
    paddingLeft: 30,
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: -12,
      height: -12
    },
    shadowOpacity: 0.80,
    shadowRadius: 7.49,

    elevation: 5
  },
  btnContainerLogin: {
    width: '95%',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 40
  },
  btnLogin: {
    backgroundColor: '#454648',
    // height: '90%'
    padding: 15,
    borderRadius: 5
  },
  iconRight: {
    color: '#C1C1C1',
    fontSize: 20
  }

})
