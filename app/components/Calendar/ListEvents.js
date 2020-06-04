import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { size } from 'lodash'
// Importamos el hook de navigation para poder navegar dentro del stack
import { useNavigation } from '@react-navigation/native'
export default function ListEvents (props) {
  const { events, handleLoadMore, isLoading } = props
  // Instanciamos el hook
  const navigation = useNavigation()
  // const events = []
  return (
    <View>
      {size(events) > 0 ? (
        <FlatList
          data={events}
          renderItem={(event) => <Event event={event} navigation={navigation} />}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={handleLoadMore}
          ListFooterComponent={<FooterList isLoading={isLoading} />}
        />
      ) : (
        <View style={styles.loaderEvents}>
          <ActivityIndicator size='large' />
          <Text>Cargando eventos...</Text>
        </View>
      )}

    </View>
  )
}
function Event (props) {
  const { event, navigation } = props
  const { id, name } = event.item

  const goEvent = () => {
    navigation.navigate('event', { id, name })
  }
  return (
    <TouchableOpacity onPress={goEvent}>
      <View style={styles.viewEvent}>
        <Text>{name}</Text>
        {/* <Text>Evento</Text> */}
      </View>
    </TouchableOpacity>
  )
}

function FooterList (props) {
  const { isLoading } = props

  if (isLoading) {
    return (
      <View style={styles.loadingEvents}>
        <ActivityIndicator size='large' />
      </View>
    )
  } else {
    return (
      <View style={styles.loaderEventsEnd}>
        <Text>Son todos</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewEvent: {
    // backgroundColor: '#fff',
    flex: 1,
    height: 250,
    width: '50%',
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 25,
    shadowOffset: {
      width: -12,
      height: -12
    },
    shadowOpacity: 1,
    shadowRadius: 61,
    shadowColor: '#000',
    elevation: 10,
    backgroundColor: '#F1F3F4',
    paddingLeft: 30,
    fontSize: 18,
    letterSpacing: 2,
    color: '#454648'

  }
  // loaderEvents: {
  //   margin: 50,
  //   alignItems: 'center'
  // },
  // loaderEventsEnd: {
  //   backgroundColor: 'red',
  //   flex: 1
  // }
})
