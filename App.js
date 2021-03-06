import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import CameraPage from './src/camera.page';
import { Constants } from 'expo';
import Home from './src/components/Home.component.js';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import Gallery from './src/components/Gallery.component.js';
import Background from './src/components/BackgroundMenu.component.js';
import DisplayAnImage from './src/components/DisplayAnImage.component.js';
import Overlay from './src/components/Overlay.component.js';

class SplashScreen extends React.Component {
  render() {
    const someLocalImage = require('./assets/overlay_slide.gif');
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
      },
    });

    return (
      <View style={styles.container}>
      <Image
      style={{width: 300, height: 200}}
      source={someLocalImage} />
      </View>
    );
  }
}


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }


  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
    setTimeout(
      () => { resolve('result') },
      2000
    )
  );
}

async componentDidMount() {
  // Preload data from an external API
  // Preload data using AsyncStorage
  const data = await this.performTimeConsumingTask();

  if (data !== null) {
    this.setState({ isLoading: false });
  }
}

//splash screen
render() {
  if (this.state.isLoading) {
    // return <SplashScreen />;
  }

  return (
    // <CameraPage />
    <AppContainer />
  );
};
};

const AppNavigator = createDrawerNavigator({
  Home: {
    screen: Home
  },
  Camera: {
    screen: CameraPage
  },
  Gallery: {
    screen: Gallery
  },
  Background: {
    screen: Background
  },
  DisplayAnImage: {
    screen: DisplayAnImage
  },
  Overlay: {
    screen: Overlay
  }
}, {
  initialRouteName: "Home",
  contentOptions: {
    activeTintColor: '#e91e63'
  }
});

const AppContainer = createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
