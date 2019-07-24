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
  }

  render() {
    const someLocalImage = require('../../assets/overlay_logo.png');
    const styles = StyleSheet.create({
      photoText: {
        fontFamily: 'Bodoni 72',
        textAlign: 'center',
      },
      galleryText: {
        fontFamily: 'Bodoni 72',
        textAlign: 'center',
      },
      titleText: {
        fontFamily: 'Bodoni 72',
        fontSize: 20,
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
        top: 15,
        width: 300,
        height: 200
      }
    });

    return (
      <View style={styles.container}>
        <Image
        style={styles.logo_img}
        source={someLocalImage} />
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
          {this.state.titleText}{'\n'}{'\n'}
          </Text>
          <Text style={styles.photoText} onPress={this.onPressTitle}>
          {this.state.photoText}{'\n'}{'\n'}
          </Text>
          <Text style={styles.galleryText} onPress={this.onPressTitle}>
          {this.state.galleryText}{'\n'}{'\n'}
          </Text>
        </Text>

      </View>
    );
  }
}


// skip this line if using Create React Native App
AppRegistry.registerComponent('Home', () => Home);
