import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
// Importamos este hook propio de raect navigation para actualizxar la lista de eventos una vez se cree uno
import { useFocusEffect } from '@react-navigation/native'
import { Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import firebase from 'firebase/app'
// Importamos firestore
import 'firebase/firestore'
import ListEvents from '../../components/Calendar/ListEvents'

const db = firebase.firestore(firebaseApp)

export default function Calendar ({ navigation }) {
  // Estado para guardar los eventos
  const [events, setEvents] = useState([])
  // Estado para ver cuantos eventos llegan
  const [totalEvents, setTotalEvents] = useState(0)
  // Por donde va a empezar la ultima petición del evento
  const [startEvent, setStartEvent] = useState(null)
  // State para el loading
  const [isLoading, setIsLoading] = useState(false)
  const limitEvents = 5

  useFocusEffect(
    useCallback(() => {
      db.collection('events')
        .get()
        .then((snap) => {
          setTotalEvents(snap.size)
        })

      const resultEvents = []

      db.collection('events')
        .orderBy('createAt', 'desc')
        .limit(limitEvents)
        .get()
        .then((response) => {
          setStartEvent(response.docs[response.docs.length - 1])
          response.forEach((doc) => {
            const event = doc.data()
            event.id = doc.id
            resultEvents.push(event)
          })
          setEvents(resultEvents)
        })
    }, [])
  )

  // useEffect(() => {

  // }, [])

  const handleLoadMore = () => {
    const resultEvents = []
    events.length < totalEvents && setIsLoading(true)

    db.collection('events')
      .orderBy('createAt', 'desc')
      .startAfter(startEvent.data().createAt)
      .limit(limitEvents)
      .get()
      .then(response => {
        if (response.docs.length > 0) {
          setStartEvent(response.docs[response.docs.length - 1])
        } else {
          setIsLoading(false)
        }

        response.forEach((doc) => {
          const event = doc.data()
          event.id = doc.id
          resultEvents.push(event)
        })
        setEvents([...events, ...resultEvents])
      })
  }
  return (

    <View style={styles.viewBody}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Eventos</Text>
      </View>
      <View style={styles.containerList}>
        <ListEvents
          events={events}
          handleLoadMore={handleLoadMore}
          isLoading={isLoading}
        />
      </View>
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
  },
  containerTitle: {
    // backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'center'
  },
  containerList: {
    // backgroundColor: 'green',
    flex: 4
  },
  title: {
    marginHorizontal: 50,
    fontSize: 22,
    color: '#454648'
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
