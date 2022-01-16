import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'

import { selectUiErrors } from '../store/errors/selectors'

const ErrorPage = () => {
  const errors = useSelector(selectUiErrors)

  return <View>
    {errors.map(({ id, message }) => <Text key={id}>ERROR: {message}</Text>)}
  </View>
}

export default ErrorPage
