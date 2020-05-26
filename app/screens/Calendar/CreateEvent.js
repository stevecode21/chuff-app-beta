import React, { useState, useRef } from 'react'
import { View, Text } from 'react-native'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading/Loading'
import AddCalendarForm from '../../components/Calendar/AddCalendarForm'
import Loader from '../../../assets/gifs/loader-food.gif'
export default function CreateEvent ({ navigation }) {
  const [isLoading, setIsLoading] = useState(false)
  const toastRef = useRef()
  return (
    <View>
      <AddCalendarForm toasRef={toastRef} setIsLoading={setIsLoading} navigation={navigation} />
      <Toast ref={toastRef} position='bottom' opacity={0.9} />
      <Loading isVisible={isLoading} loader={Loader} />
    </View>
  )
}
