import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

export default function Calendar ({ navigation }) {
  return (

    <View style={styles.viewBody}>
      <Text>Calendar...</Text>
      <Icon
        reverse
        type='material-community'
        name='plus'
        color='#454648'
        containerStyle={styles.btnContainerAddEvent}
        onPress={() => navigation.push('add-event')}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
    // padding: 50
  },
  btnContainerAddEvent: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: '#454648',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.5
    // left: '50%'
  }
})
