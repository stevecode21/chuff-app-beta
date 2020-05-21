import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'

export default function Home ({ navigation }) {
  return (
    <View style={styles.containerHome}>
      <View style={styles.containerShortcuts}>
        <Text style={styles.titleShorcuts}>Tus accesos directos</Text>
        <View style={styles.containerBtnShortcuts}>
          {/* <Button
            title='Agenda'
            buttonStyle={styles.shortCutsAgenda}
            titleStyle={styles.textStyleShortCuts}
            containerStyle={styles.btnContainer}
          /> */}
          <TouchableOpacity
            style={styles.touchableAgenda} onPress={() => console.log('Agenda')}
          >
            <View style={styles.viewButton}>
              <Text style={styles.textShotcuts}>Agenda</Text>
            </View>
            <Image
              source={require('../../../assets/img/pizza.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.touchableRecipes} onPress={() => console.log('Recetas')}>
            <View style={styles.viewButton}>
              <Text style={styles.textShotcuts}>Recetas</Text>
            </View>
            <Image
              source={require('../../../assets/img/recetas.png')}
              style={styles.image}
            />

          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableEvents} onPress={() => console.log('Eventos')}>
            <View style={styles.viewButton}>
              <Text style={styles.textShotcuts}>Eventos</Text>
            </View>
            <Image
              source={require('../../../assets/img/postit.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchablePastEvents} onPress={() => console.log('Histórico')}>
            <View style={styles.viewButton}>
              <Text style={styles.textShotcuts}>Histórico</Text>
            </View>
            <Image
              source={require('../../../assets/img/wear.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  viewButton: {
    // backgroundColor: '#FC4F4F'
    position: 'absolute',
    left: 20,
    justifyContent: 'center'
  },
  image: {
    // backgroundColor: 'red'
    // width: 200,
    // height: 100,
    top: 10,
    left: 50
  },
  touchableAgenda: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FC4F4F',
    flexDirection: 'row',
    width: '40%',
    height: 53,
    overflow: 'hidden',
    borderRadius: 5,
    margin: 10
    // paddingLeft: 50
  },
  touchableRecipes: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCAC4F',
    flexDirection: 'row',
    width: '40%',
    height: 53,
    overflow: 'hidden',
    borderRadius: 5,
    margin: 10
    // paddingLeft: 50
  },
  touchableEvents: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#38B535',
    flexDirection: 'row',
    width: '40%',
    height: 53,
    overflow: 'hidden',
    borderRadius: 5,
    margin: 10
    // flex: 1
    // marginTop: 12
    // paddingLeft: 50
  },
  touchablePastEvents: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8844A0',
    flexDirection: 'row',
    width: '40%',
    height: 53,
    overflow: 'hidden',
    borderRadius: 5,
    margin: 10
    // flex: 1
    // marginTop: 12
    // paddingLeft: 50
  },
  textShotcuts: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center'
    // position: 'absolute'
  },

  containerHome: {
    backgroundColor: '#FFFFFF',
    minHeight: '100%'
  },
  containerShortcuts: {
    paddingTop: 100,
    padding: 15
  },
  titleShorcuts: {
    fontSize: 22,
    fontWeight: '900'
  },
  containerBtnShortcuts: {
    marginTop: 30,
    // paddingLeft: 5,
    // paddingRight: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'

    // position: 'absolute',
    // backgroundColor: 'green'
  },
  // btnContainer: {
  //   width: 163,
  //   height: 53
  // },
  shortCutsAgenda: {
    backgroundColor: '#FC4F4F'

  },
  textStyleShortCuts: {
    textAlign: 'left'
  }
})
