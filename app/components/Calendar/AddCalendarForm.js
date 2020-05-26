import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, TextInput } from 'react-native'
import { Icon, Avatar, Button } from 'react-native-elements'
// Importamos datetimepickermodal para usar los modal nativos de fecha y hora
import DateTimePickerModal from 'react-native-modal-datetime-picker'
// Importamos moment js para formatear fecha y hora
import moment from 'moment'
import 'moment/locale/es-us'
// Permisos para acceder a componentes de mi dispositivo
import * as Permissions from 'expo-permissions'
// Importo mi expo location par aobtener la localización de mi dispositivo
import * as Location from 'expo-location'
// Importo mi mapview para visualizar un mapa
import MapView from 'react-native-maps'

import Modal from '../Modal'

export default function AddCalendarForm (props) {
  // Recibimos los props
  const { toastRef, setIsLoading, navigation } = props

  // Creamos los estados para almacenar los datos del formulario
  const [eventName, setEventName] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventPrice, setEventPrice] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventHour, setEventHour] = useState('')
  const [eventPlace, setEventPlace] = useState('')

  // State papra la visibilidad del modal datepicker para fecha
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  // State papra la visibilidad del modal datepicker para hora
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  // State para mostrar u ocultar el modal con el map
  const [isVisibleMap, setIsVisibleMap] = useState(false)

  /* Muestra u oculta el date picker */
  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const confirmDate = (date) => {
    // Legibilidad de la fecha
    // Guardando fecha convirtiendola en una fecha más legible con momentJS
    hideDatePicker()
    // const dateFormat = date.toLocaleDateString('es-ES', opciones)
    // const dateFormat = moment(date).format('ll')
    moment.locale('es-us')
    setEventDate(moment(date).format('ll'))
  }

  /* Muestra u oculta el time picker */
  const showTimePicker = () => {
    setTimePickerVisibility(true)
  }

  const hideTimePicker = () => {
    setTimePickerVisibility(false)
  }

  const confirmTime = (time) => {
    hideTimePicker()
    moment.locale('es-us')
    setEventHour(moment(time).format('LT'))
  }

  const addEvent = () => {
    console.log('ok')
  }

  return (
    <ScrollView style={styles.scrollView}>
      <FormAdd
        setEventName={setEventName}
        setEventDescription={setEventDescription}
        setEventPrice={setEventPrice}
        // setEventDate={setEventDate}
        // setEventHour={setEventHour}
        setEventPlace={setEventPlace}
        eventHour={eventHour}
        eventDate={eventDate}
        // Date picker props
        showDatePicker={showDatePicker}
        hideDatePicker={hideDatePicker}
        confirmDate={confirmDate}
        isDatePickerVisible={isDatePickerVisible}
        // Time picker props
        showTimePicker={showTimePicker}
        hideTimePicker={hideTimePicker}
        confirmTime={confirmTime}
        isTimePickerVisible={isTimePickerVisible}
        // Modal dinamico, se lo paso al form add para que finalmente se ejecute como evento on press desde el icon
        setIsVisibleMap={setIsVisibleMap}
      />
      <Button
        title='Crear evento'
        onPress={addEvent}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        toastRef={toastRef}
      />
    </ScrollView>
  )
}
function FormAdd (props) {
  const {
    setEventName,
    setEventDescription,
    setEventPrice,
    eventDate,
    eventHour,
    setEventPlace,
    // date picker props
    showDatePicker,
    hideDatePicker,
    confirmDate,
    isDatePickerVisible,
    // time picker props
    showTimePicker,
    hideTimePicker,
    confirmTime,
    isTimePickerVisible,
    // State para el modal y mostrar el map
    setIsVisibleMap
  } = props

  return (
    <View style={styles.viewForm}>
      <TextInput
        placeholder='Nombre del evento'
        style={styles.inputNameForm}
        onChange={(e) => setEventName(e.nativeEvent.text)}
      />
      <TextInput
        placeholder='Descripción'
        style={styles.inputNameForm}
        multiline
        onChange={(e) => setEventDescription(e.nativeEvent.text)}
      />
      <TextInput
        placeholder='Precio'
        style={styles.inputNameForm}
        onChange={(e) => setEventPrice(e.nativeEvent.text)}
      />

      <View>
        <Text>Fecha: </Text>
        <Button title='Show Date Picker' onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={confirmDate}
          onCancel={hideDatePicker}
          locale='es_ES'
          headerTextIOS='Elige una fecha'
        />
        <Text>{eventDate}</Text>
      </View>
      <View>
        <Text>Hora: </Text>
        <Button title='Show Time Picker' onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode='time'
          onConfirm={confirmTime}
          onCancel={hideTimePicker}
          locale='es_ES'
          headerTextIOS='Elige una hora'
        />
        <Text>{eventHour}</Text>
      </View>
      <TextInput
        placeholder='Lugar'
        style={styles.inputNameForm}
        onChange={(e) => setEventPlace(e.nativeEvent.text)}
      />
      <Icon
        raised
        name='google-maps'
        type='material-community'
        color='#C2C2C2'
        onPress={() => setIsVisibleMap(true)}
      />
    </View>
  )
}

function Map (props) {
  // Destructuring para recuperar las props del modal
  const { isVisibleMap, setIsVisibleMap, toastRef } = props
  // State para guardar la localización actual, la inicializamos
  const [location, setLocation] = useState(null)

  useEffect(() => {
    // Funcion anonima asincrona autoejecutable
    (async () => {
      // los permisos los guardamos en una variable
      const resultPermissions = await Permissions.askAsync(
        // Llamamos el permiso de localización
        Permissions.LOCATION
      )
      // Obtenemos el status de la localización
      const statusPermissions = resultPermissions.permissions.location.status

      if (statusPermissions !== 'granted') {
        toastRef.current.show('Debes aceptar los permisos de localización para crear tu evento', 3000)
      } else {
        // Obtenemos la localización
        const loc = await Location.getCurrentPositionAsync({})
        console.log(loc)
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001
        })
      }
    })()
  }, [])

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>{location && (
        <MapView
          style={styles.mapStyle}
          initialRegion={location}
          showsUserLocation
          onRegionChange={(region) => setLocation(region)}
        >

          <MapView.Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            draggable
          />
        </MapView>
      )}
      </View>
    </Modal>
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
  },
  mapStyle: {
    width: '100%',
    height: 550
  }
})
