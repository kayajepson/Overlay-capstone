import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, Image, View  } from 'react-native';
import { Constants } from 'expo';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "which would you prefer?",
      photoText: 'take a photo',
      galleryText: 'choose from gallery'
    };
    this.handlePressPhoto = this.handlePressPhoto.bind(this);
  }

  handlePressPhoto() {

  }

  render() {
    const logoImage = require('../../assets/overlay_logo.png');
    const floralIcon = require('../../assets/element_24.png');
    const styles = StyleSheet.create({
      photoText: {
        fontFamily: 'Bodoni 72',
        textAlign: 'center',
        fontSize: 20,
      },
      galleryText: {
        fontFamily: 'Bodoni 72',
        textAlign: 'center',
        fontSize: 20,
      },
      titleText: {
        fontFamily: 'Bodoni 72',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
      },
      logo_img: {
        resizeMode: 'contain',
        flex: 1,
        position: 'absolute',
        top: 25,
        width: 300,
        height: 200
      },
      icon_img: {
        resizeMode: 'contain',
        flex: 1,
        position: 'absolute',
        bottom: 35,
        width: 100,
        height: 100
      }
    });

    return (
      <View style={styles.container}>
        <Image
        style={styles.logo_img}
        source={logoImage} />
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
          {this.state.titleText}{'\n'}{'\n'}{'\n'}
          </Text>
          <Text style={styles.photoText}>
          {this.state.photoText}{'\n'}{'\n'}{'\n'}
          </Text>
          <Text style={styles.galleryText}>
          {this.state.galleryText}{'\n'}{'\n'}
          </Text>
        </Text>
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
