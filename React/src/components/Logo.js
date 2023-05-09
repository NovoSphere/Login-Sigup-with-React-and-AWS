import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/pngg.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 150,
    marginBottom: 0,
    right:-55,
    top:12,
    alignContent:'center'
  },
})
