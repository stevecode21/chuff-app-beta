import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Modal (props) {
  // Props que recibe para saber si se debe mostrar o no y asimismo lo que debe ir dentro del overlay (children)
  const { isVisible, setIsVisible, children } = props

  // La función para que cuando el usuario presione fuera del modal este se cierre
  const closeModal = () => setIsVisible(false)

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor='rgba(0, 0, 0, 0.5)'
      overlayBackgroundColor='transparent'
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    height: 'auto',
    width: '90%',
    backgroundColor: '#fff'
  }
})
