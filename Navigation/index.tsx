import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MainStacks from './MainStacks';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <MainStacks/>
    </NavigationContainer>
  )
}

export default RootNavigation