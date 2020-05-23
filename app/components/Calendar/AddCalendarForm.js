import React from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, TextInput } from 'react-native'
import { Icon, Avatar, Button } from 'react-native-elements'

export default function AddCalendarForm (props) {
  const { toastRef, setIsLoading, navigation } = props
  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd />
    </ScrollView>
  )
}
function FormAdd (props) {
  return (
    <View style={styles.viewForm}>
      <TextInput
        placeholder='Nombre del evento'
        style={styles.inputNameForm}
      />
      <TextInput
        placeholder='Descripción'
        style={styles.inputNameForm}
        multiline
      />
      <TextInput
        placeholder='Precio'
        style={styles.inputNameForm}
      />
      <TextInput
        placeholder='Fecha'
        style={styles.inputNameForm}
      />
      <TextInput
        placeholder='Hora'
        style={styles.inputNameForm}
      />
      <TextInput
        placeholder='Lugar'
        style={styles.inputNameForm}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
    padding: 50
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  inputNameForm: {
    marginBottom: 10
  }
})
