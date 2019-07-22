class SplashScreen extends React.Component {
  render() {
    const viewStyles = [
      styles.container,
      { backgroundColor: 'white' }
    ];
    const textStyles = {
      color: 'orange',
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
