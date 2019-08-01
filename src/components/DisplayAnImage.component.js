import React, { Component } from 'react';
import { Button, StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Platform} from 'react-native';

export default class DisplayAnImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoading: true,
      photoUrl: props.navigation.state.params.photoUrl,
      imageData: props.navigation.state.params.base64,
    }
  }


  _pickImage() {
    let base64Img = `data:image/jpg;base64,${this.state.imageData}`

    //Add your cloud name
    let apiUrl = 'https://api.cloudinary.com/v1_1/dzooqxmw2/image/upload';

    let data = {
      "file": base64Img,
      "upload_preset": "hwlhaluq",
    }

    fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      this.props.navigation.navigate('Overlay', {
        photoUrl: data.secure_url
      })
    }).catch(err=>console.log(err))
  }
  render() {
    const logoImage = require('../../assets/logo.png');
    return (
      <View style={styles.container}>
          <Image
          style={styles.logo_img}
          source={logoImage} />
          <Image
          style={styles.image, { width: 300, height: 400 }}
          source={{
            uri: this.state.photoUrl,
          }}
          />
          <View style={styles.buttonContainer}>
          <View style={{margin:10}}>
          <Button
          onPress={() => this._pickImage()}
          title="continue"
          color="#b897af"
          style={styles.buttons}
          />
          </View>
          <View style={{margin:10}}>
          <Button
          onPress={() => this.props.navigation.navigate('Camera')}
          title="retake"
          color="#b897af"
          style={styles.buttons}
          />
          </View>
        </View>
      </View>
    );
  }
};



const styles = StyleSheet.create({
  uploadText: {
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
  retakeText: {
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
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    marginLeft: '10px',
    padding: '10',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  image: {
    flex: 3,
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
    // position: 'absolute',
    width: 300,
    height: 200
  }
});
