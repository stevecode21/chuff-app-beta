import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
// Importamos el avatar temporal para mostrar en el perfil
import { Avatar } from 'react-native-elements'
import DefaultAvatar from '../../../assets/img/avatar.png'

export default function InfoProfile (props) {
  const { profileInfo: { photoURL, displayName, email } } = props
  console.log(photoURL)
  console.log(displayName)
  console.log(email)

  return (
    <View style={styles.viewProfileInfo}>
      {/* Llmamos nuestro avatar temporal */}
      {/* <Avatar
      // Propiedad round ya que será un circulo
        rounded
        // Añadimos el tamaño
        size='xlarge'
        // Añadimos el edit del button
        showEditButton
        containerStyle={styles.profileInfoAvatar}
        source={DefaultAvatar}
      /> */}
      <View>
        <Image
          source={photoURL ? { uri: photoURL } : DefaultAvatar}
          resizeMode='contain'
          style={styles.profileInfoAvatar}
        />
      </View>
      <View>
        <Text style={styles.displayName}>{displayName || 'chuffer'}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewProfileInfo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    // backgroundColor: '#F2F2F2',
    paddingTop: 40,
    paddingBottom: 30,
    paddingLeft: 20
  },
  profileInfoAvatar: {
    marginRight: 20,
    width: 100,
    height: 120
    // backgroundColor: '#fff'
  },
  displayName: {
    fontWeight: 'bold',
    paddingBottom: 5
  }
})
