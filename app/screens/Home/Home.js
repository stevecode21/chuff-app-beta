import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
// Importo el loading para ir precargando las fonts
import { AppLoading } from 'expo'

export default function Home ({ navigation }) {
  // Cargando las fonts
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold
  })
  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={styles.viewHome}>
        <View style={styles.containerShortcuts}>
          <View style={styles.containerTitle}>
            {/* <Text style={styles.titleShorcuts}>Tus accesos directos</Text> */}
          </View>
          <View style={styles.containerBtnShortcuts}>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.containerContent}>
          {/* <Text>aafaf</Text> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewHome: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerShortcuts: {
    // backgroundColor: 'blue',
    flex: 1
  },
  containerTitle: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  containerBtnShortcuts: {
    flex: 2,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerContent: {
    flex: 1
    // backgroundColor: 'green'

  },
  titleShorcuts: {
    fontSize: 22,
    marginHorizontal: 30,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#454648'
    // fontWeight: '900'
  },
  // viewButton: {
  //   // backgroundColor: '#FC4F4F'
  //   position: 'absolute',
  //   left: 20,
  //   justifyContent: 'center'
  // }
  // containerTitle: {
  //   backgroundColor: 'red'
  // },
  image: {
    // backgroundColor: 'red'
    width: 100,
    height: 100,
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

  // containerHome: {
  //   backgroundColor: '#FFFFFF',
  //   minHeight: '100%'
  // },
  // containerShortcuts: {
  //   paddingTop: 100,
  //   padding: 15
  // },

  // containerBtnShortcuts: {
  //   marginTop: 30,
  //   // paddingLeft: 5,
  //   // paddingRight: 5,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'center'

  //   // position: 'absolute',
  //   // backgroundColor: 'green'
  // },
  // // btnContainer: {
  // //   width: 163,
  // //   height: 53
  // // },
  // shortCutsAgenda: {
  //   backgroundColor: '#FC4F4F'

  // },
  textStyleShortCuts: {
    textAlign: 'left'
  }
})
