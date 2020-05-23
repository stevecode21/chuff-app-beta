import React, { useState } from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { Input, Icon, Button, Text } from 'react-native-elements'
// Importo mi loading para que mientras firebase registra el usuario haya un loading
import Loading from '../Loading/Loading'
// Importamos la validación de mi email
import { validateEmail } from '../../utils/Validations'
// Vamos a importar lodash y traemos size para validar la longitud de la password, también traeremos isEmpty para validar si el form está vacío o no
import { size, isEmpty } from 'lodash'
// Voy a importar firebase para enviar los datos del registro y registrar exitosamente el usuario
import * as firebase from 'firebase'
// Importamos mi navigation aquí para que cuando finalice de registrarse, se redireccione al home
// import { useNavigation } from '@react-navigation/native'

export const RegisterForm = (props) => {
  // De los props que recibe este componente haremos destructuring para recuperar el prop toastRef
  const { toastRef } = props
  // Este será mi state para mostrar la contraseña con el icon button
  const [showPassword, setShowPassword] = useState(true)
  // Este será el estado par aalamacenar la data que se está introduciendo por el form
  const [formData, setFormData] = useState(defaultFormValue)
  // Crearemos un nuevo estado local para declarar cuando será visible y cuando no el loading al momento de crear la cuenta, por defecto será false
  const [loading, setLoading] = useState(false)

  // Vamos a crear un hook de navigation para recuperar nuestro sistema de navegación
  // const navigation = useNavigation()
  // Creamos un evento obSumit para el botón
  const onSubmit = () => {
    // Validamos si los campos del form están vacios
    if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.nickname)) {
      // console.log('No olvides llenar todos los campos')
      // Entramos en la propiedad currecnt que contiene las propiedades como funcionarán mi toast y la función show para mostrar el texto
      toastRef.current.show('No olvides llenar todos los campos')

      // Si validation email devuelve false, el email no será valido
    } else if (!validateEmail(formData.email)) {
      // console.log('El email no es correcto');
      toastRef.current.show('El email no es correcto')

      // Vamos a validar la longitud de caracteres mayor a 6  de la password con size
    } else if (size(formData.password) < 6) {
      // console.log('La contraseña debe tener mínimo 6 caracteres');
      toastRef.current.show('La contraseña debe tener mínimo 6 caracteres')

      // Si no hay problema con ningun campo,haremos el registro en firebase
    } else {
      // Sobre escribimos el estado del loading
      setLoading(true)
      // Llamamos a firebase con la función de autenticación y llamamos al metodo de crear un usuario con email y contraseña pasandole los datos que hemos guardado
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        // Esta autenticación devuelve una promesa, así que la resolveremos
        .then(() => {
          setLoading(false)
        })
        // Si da error, trataremos el error con un .catch
        .catch(() => {
          setLoading(false)
          // Imprimimos el error
          toastRef.current.show('El email ya está en uso, prueba con otro')
        })
    }
  }

  // Creamos el evento onChange para ser el escuchador de nuestros inputs
  const onChange = (e, type) => {
    // con el spread operator (...) vamos a obtener el valor que tiene mi state actualmente en el objeto y asi de acuerdo al onChange y cuando ocurra el onSubmit podré realizar la actualización de todos los valores de mi objeto con los valores nuevos
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }
  return (
    <View style={styles.formContainerRegister}>
      <View style={styles.containerTitle}>
        <Text style={styles.titleRegister}>Registrate</Text>
      </View>
      <View style={styles.containerInputs}>
        <TextInput
          placeholder='E-mail'
          style={styles.inputRegisterForm}
          onChange={e => onChange(e, 'email')}
        />
        <TextInput
          placeholder='Nickname'
          style={styles.inputRegisterForm}
          onChange={e => onChange(e, 'nickname')}
        />
        <TextInput
          placeholder='Contraseña'
          style={styles.inputRegisterForm}
          password
          secureTextEntry={showPassword}
          onChange={e => onChange(e, 'password')}
          rightIcon={
            <Icon
              type='material-community'
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              iconStyle={styles.iconRight}
              // Actualizamos al valor contrario de showpassword,  '!'-> Nos devolverá el valor contrario
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>
      <View style={styles.containerButton}>
        <Button
          title='Crear cuenta'
          containerStyle={styles.btnContainerRegister}
          buttonStyle={styles.btnRegister}
          onPress={onSubmit}
        />

      </View>
      {/* Aqui llamamos al componente loading y será visible cuando el state sea true */}

      {/* <Loading isVisible={loading} /> */}
    </View>
  )
}

function defaultFormValue () {
  return {
    email: '',
    nickname: '',
    password: ''
  }
}

const styles = StyleSheet.create({
  formContainerRegister: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 30

  },
  containerTitle: {
    // flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerInputs: {
    flex: 4,
    // backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  containerButton: {
    flex: 1,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleRegister: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 5,
    color: '#454648'
  },
  inputRegisterForm: {
    width: '95%',
    height: 49,
    borderRadius: 12,
    shadowOffset: {
      width: -12,
      height: -12
    },
    shadowOpacity: 1,
    shadowRadius: 61,
    shadowColor: '#000',
    elevation: 10,
    backgroundColor: '#F1F3F4',
    paddingLeft: 30,
    fontSize: 18,
    letterSpacing: 2,
    color: '#454648'
  },
  btnContainerRegister: {
    width: '95%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  btnRegister: {
    backgroundColor: '#454648',
    padding: 15,
    borderRadius: 5
  }
})
