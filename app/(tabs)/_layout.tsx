import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { screenOptions } from '@/components/ScreenOptions'


const _Layout = () => {
  return (
    <Tabs screenOptions={screenOptions}>
        <Tabs.Screen name='index' options={{ title: "Home"}}  />
        <Tabs.Screen name='search' options={{ title: "Search" }} />
        <Tabs.Screen name='saved' options={{ title: "Saved" }} />
        <Tabs.Screen name='profile' options={{ title: "Profile"}} />
    </Tabs>
  )
}

export default _Layout

const styles = StyleSheet.create({})