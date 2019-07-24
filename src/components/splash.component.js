class SplashScreen extends React.Component {
  render() {
    
    const styles = StyleSheet.create({
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
      <Image
      style={{width: 300, height: 200}}
      source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}} />
      </View>
    );
  }
}

