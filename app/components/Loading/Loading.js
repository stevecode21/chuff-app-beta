import React from 'react'
// Importo el activity indicator para que me muestre un spinner al momento del loading
import { View, Text, Image, StyleSheet } from 'react-native'
// Este Overlay es un modal en donde podremos el loading
import { Overlay } from 'react-native-elements'
// Loading va a recibir por props
export default function Loading (props) {
  // Hacemos un destructuring para obtener los props, primero isVisible para saber si se tiene que mostrar o no, y segundo el texto que queremos mostrar durante el loading
  const { isVisible, text, loader } = props
  return (
    // Si Overlay es visible de acuerdo a lo que llegue por props, lo mostraremos con su respectivo style
    <Overlay
      isVisible={isVisible}
      // Le damos un background color para la opacidad del overlay
      windowBackgroundColor='rgba(0, 0, 0, 0.5)'
      overlayBackgroundColor='transparent'
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        {/* Aquí mostraré el spinner */}
        <Image
          source={loader}
          style={{ width: 200, height: 200, backgroundColor: 'transparent', borderRadius: 50 }}
        />
        {/* <ActivityIndicator size='small' color='#454648' /> */}
        {/* Aqui evaluaremos si el texto llega, vamos a renderizar dicho texto, esto es como si fuese un if sin else  */}
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  )
}
const styles = StyleSheet.create({
  // Estos serán los estilos del overlay, lo llamaremos modal
  overlay: {
    height: 150,
    width: 150,
    backgroundColor: '#fff',
    borderColor: '#fff',
    // borderWidth: 2,
    borderRadius: 200,
    overflow: 'hidden'
  },
  // Estos serán los estilos de mi view
  view: {
    // Será de tipo flex = 1 para decir que va a ser un flexbox
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

    borderRadius: 50

  },
  // Estos serán los estilos nuestro texto
  text: {
    color: '#000',
    textTransform: 'uppercase',
    marginTop: 10,
    fontSize: 15
  }
})
