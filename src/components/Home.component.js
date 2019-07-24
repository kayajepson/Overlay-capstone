import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet } from 'react-native';
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
    const someLocalImage = require('../../assets/overlay.gif');
    const styles = StyleSheet.create({
      photoText: {
        fontFamily: 'serif',
      },
      galleryText: {
        fontFamily: 'serif',
      },
      titleText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
      },
    });
    
    return (
      <View style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
          {this.state.titleText}
          </Text>
          <Text style={styles.photoText} onPress={this.onPressTitle}>
          {this.state.photoText}{'\n'}{'\n'}
          </Text>
          <Text style={styles.galleryText} onPress={this.onPressTitle}>
          {this.state.galleryText}{'\n'}{'\n'}
          </Text>
        </Text>
        
        <Image
        style={{width: 300, height: 200}}
        source={someLocalImage} />
      </View>
    );
  }
}


// skip this line if using Create React Native App
AppRegistry.registerComponent('Home', () => Home);

