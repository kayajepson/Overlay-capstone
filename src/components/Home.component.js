import React, { Component } from 'react';
import { Button, AppRegistry, StyleSheet, Text, Image, View  } from 'react-native';
import CameraPage from '../camera.page';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Platform} from 'react-native';
import {Constants} from 'expo';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "which would you prefer?",
      photoText: 'take an overlay photo',
      galleryText: 'choose an overlay photo from the gallery',
    };
  }

  render() {
    const logoImage = require('../../assets/logo.png');
    const floralIcon = require('../../assets/logo_img_sm.png');

    return (
      <View style={styles.container}>
      <Image
      style={styles.logo_img}
      source={logoImage} />
      <Text style={styles.titleText}>
      {this.state.titleText}{'\n'}{'\n'}{'\n'}
      </Text>
        <Button
        onPress={() => this.props.navigation.navigate('Camera')}
        title="take a photo"
        color="#b897af"
        style={styles.buttons}
        />
        <Text>
        {'\n'}
        </Text>
        <Button
        onPress={() => this.props.navigation.navigate('Gallery')}
        title="choose from gallery"
        color="#b897af"
        style={styles.buttons}
        />
      <Image
      style={styles.icon_img}
      source={floralIcon} />
      </View>
    );
  }
}

// onPress={() => this.props.navigation.navigate('Camera')}

// skip this line if using Create React Native App
AppRegistry.registerComponent('Home', () => Home);

const styles = StyleSheet.create({
  photoText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Bodoni 72',
      },
      android: {
        fontFamily: 'serif'
      }
    }),
    textAlign: 'center',
    fontSize: 20,
  },
  galleryText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Bodoni 72',
      },
      android: {
        fontFamily: 'serif'
      }
    }),
    textAlign: 'center',
    fontSize: 20,
  },
  titleText: {
    ...Platform.select({
      ios: {
        fontFamily: 'Bodoni 72',
      },
      android: {
        fontFamily: 'serif'
      }
    }),
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  logo_img: {
    resizeMode: 'contain',
    flex: 1,
    position: 'absolute',
    top: 5,
    width: 300,
    height: 200
  },
  icon_img: {
    resizeMode: 'contain',
    flex: 1,
    position: 'absolute',
    bottom: 15,
    width: 100,
    height: 100
  }
});
