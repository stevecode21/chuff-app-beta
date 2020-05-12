import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
// Importamos la validación de mi email
import { validateEmail } from '../../utils/Validations'
//Vamos a importar lodash y traemos size para validar la longitud de la password, también traeremos isEmpty para validar si el form está vacío o no
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

  // Vamos a crear un hook de navigation para recuperar nuestro sistema de navegación
  // const navigation = useNavigation()
  // Creamos un evento obSumit para el botón
  const onSubmit = () => {
    // Validamos si los campos del form están vacios
    if (isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.nickname)) {
      // console.log('No olvides llenar todos los campos')
      // Entramos en la propiedad currecnt que contiene las propiedades como funcionarán mi toast y la función show para mostrar el texto
      toastRef.current.show('No olvides llenar todos los campos')

    }
    // Si validation email devuelve false, el email no será valido    
    else if (!validateEmail(formData.email)) {
      // console.log('El email no es correcto');
      toastRef.current.show('El email no es correcto')
    } // Vamos a validar la longitud de caracteres mayor a 6  de la password con size
    else if (size(formData.password) < 6) {
      // console.log('La contraseña debe tener mínimo 6 caracteres');
      toastRef.current.show('La contraseña debe tener mínimo 6 caracteres')
    }
    // Si no hay problema con ningun campo,haremos el registro en firebase
    else {
      //Llamamos a firebasem con la función de autenticación y llamamos al metodo de crear un usuario con email y contraseña pasandole los datos que hemos guardado
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        // Esta autenticación devuelve una promesa, así que la resolveremos
        .then(response => {
          console.log('Logged');

        })
        // Si da error, trataremos el error con un .catch
        .catch(err => {
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
    <View style={styles.formContainer}>
      <Input
        placeholder='E-mail'
        containerStyle={styles.inputRegisterForm}
        onChange={e => onChange(e, 'email')}
      />
      <Input
        placeholder='Nickname'
        containerStyle={styles.inputRegisterForm}
        onChange={e => onChange(e, 'nickname')}
      />
      <Input
        placeholder='Contraseña'
        containerStyle={styles.inputRegisterForm}
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
      <Button
        title='Crear cuenta'
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
    </View>
  )
}
function defaultFormValue() {
  return {
    email: '',
    nickname: '',
    password: ''
  }
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  inputRegisterForm: {
    width: '100%',
    marginTop: 20
    // backgroundColor: '#F1F3F4'
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1
  },
  btnContainerRegister: {
    marginTop: 20,
    width: '95%'

  },
  btnRegister: {
    backgroundColor: '#454648',
    height: 46
  },
  iconRight: {
    color: '#C1C1C1',
    fontSize: 20
  }
})
