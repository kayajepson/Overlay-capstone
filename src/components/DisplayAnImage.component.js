import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Platform} from 'react-native';

export default function DisplayAnImage(photoUrl) {
  console.log("displsdfsdfay", photoUrl);
  const logoImage = require('../../assets/overlay_logo.png');
  console.log("display", photoUrl);
  return (
    <View style={styles.container}>
    <Image
    style={styles.logo_img}
    source={logoImage} />
    <Image
    // style={styles.image}
    style={{ width: 300, height: 500 }}
    source={{
      uri: photoUrl.navigation.state.params.photoUrl,
    }}
    />
    <Text>
    Youre here
    </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    flex: 4,
    width: 300,
    height: null,
    resizeMode: 'contain',
    margin: 10,
  },
  text: {
    ...Platform.select({
      ios: {
        fontFamily: 'Bodoni 72',
      },
      android: {
        fontFamily: 'serif'
      }
    }),
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#000000',
  },
  logo_img: {
    resizeMode: 'contain',
    flex: 1,
    position: 'absolute',
    width: 300,
    height: 200
  }
});
