import React from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImageStart from '../../components/ImageStart/ImageStart'
import { RegisterForm } from '../../components/Start/RegisterForm'

export default function Register () {
  return (
    <KeyboardAwareScrollView style={styles.viewBody}>
      <ImageStart />
      <View style={styles.viewContainerRegister}>
        <RegisterForm />
      </View>
      {/* <View style={styles.containerViewMessage}>
        <Text>Beta</Text>
      </View> */}
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: '#fff'
  },
  viewContainerRegister: {
    marginRight: 40,
    marginLeft: 40,
    shadowColor: '#000'
  }
  // containerViewMessage: {
  //   height: '100',
  //   flex: 3,
  //   backgroundColor: 'red'

  // }

})
