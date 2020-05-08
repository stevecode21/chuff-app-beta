import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'

export const RegisterForm = () => {
  // Este será mi state para mostrar la contraseña con el icon button
  const [showPassword, setShowPassword] = useState(false)
  // Este será el estado par aalamacenar la data que se está introduciendo por el form
  const [formData, setFormData] = useState(defaultFormValue)

  // Creamos un evento obSumit para el botón
  const onSubmit = () => {
    console.log(formData)
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
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            iconStyle={styles.iconRight}
            // Actualizamos al valor contrario de showpassword,  !-> Nos devolverá el valor contrario
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
function defaultFormValue () {
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
