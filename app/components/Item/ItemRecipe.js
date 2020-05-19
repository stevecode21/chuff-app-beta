import React, { useState } from 'react'
import { View, TextInput, Button } from 'react-native'

export const ItemRecipe = () => {
  const [item, setItem] = useState([{ value: null }])

  const handleChange = (i, event) => {
    const values = [...item]
    values[i].value = event.target.value
    setItem(values)
    console.log(event.target.value)
  }

  const handleAdd = () => {
    const values = [...item]
    values.push({ value: null })
    setItem(values)
    console.log(item)
  }
  const handleRemove = (i) => {
    const values = [...item]
    values.splice(i, 1)
    setItem(values)
  }

  return (
    <View>
      {item.map((ingredient, idx) => {
        return (
          <View key={`${ingredient}-${idx}`}>

            <TextInput
              placeholder='Ingrediente'
              value={ingredient.value}
              onChange={e => handleChange(idx, e)}
              multiline={multiline}
            />
            <Button title='x' onPress={() => handleRemove(idx)} />

          </View>
        )
      })}
      <Button title='+' onPress={() => handleAdd()} />
    </View>
  )
}
