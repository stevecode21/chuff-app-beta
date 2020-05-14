import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { isEmpty } from 'lodash'
// Importo firebase para la autenticación de login
import * as firebase from 'firebase'
// Importamos la función que se ocupa de validar email
import { validateEmail } from '../../utils/Validations'
import Loading from '../Loading/Loading'

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
    <View style={styles.formContainerLogin}>
      <TextInput
        style={styles.inputFormLogin}
        placeholder='E-mail'
        onChange={(e) => onChange(e, 'email')}
      />
      {/* <Input
        placeholder='E-mail'
        containerStyle={styles.inputFormLogin}
        // Aqui le estamos pasando al onChange el evento que lo recuperaremos de la función flecha en el que está siendo envuelto y el tipo de dato
        onChange={(e) => onChange(e, 'email')}
      /> */}
      <Input
        placeholder='Password'
        containerStyle={styles.inputFormLogin}
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
    </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  inputFormLogin: {
    width: '100%',
    height: 59,
    borderRadius: 12,
    marginTop: 20,
    backgroundColor: '#F1F3F4',
    paddingLeft: 30,
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12
  },
  btnContainerLogin: {
    marginTop: 20,
    width: '95%'
  },
  btnLogin: {
    backgroundColor: '#454648',
    height: 46
  },
  iconRight: {
    color: '#C1C1C1',
    fontSize: 20
  }
})
