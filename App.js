import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraPage from './src/camera.page';

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container, { backgroundColor: 'orange' }];
    const textStyles = {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold'
    };

    return (
      <View style={viewStyles}>
      <Text style={textStyles}>
      Splash Screen
      </Text>
      </View>
    );
  }
}


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true }
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


render() {
  if (this.state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <CameraPage />
  );
};
};

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
