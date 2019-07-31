import React, { Component } from 'react';
import { Button, AppRegistry, Text, StyleSheet, Image, View  } from 'react-native';
import { Constants, ImagePicker } from 'expo';
import CameraPage from '../camera.page';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {Platform} from 'react-native';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "which would you prefer?",
      photoText: 'take a photo',
      image:[],
      photoUrl:'',
    };
  }

  propsUpdated() {
    console.log(this.state);
  }

  showImageAfterBackgroundRemoval(){
    this.props.navigation.navigate('DisplayAnImage', {
    photoUrl: this.state.photoUrl
    })
  }

  _renderImages() {
    let images = [];
    //let remainder = 4 - (this.state.devices % 4);
    this.state.image.map((item, index) => {
      images.push(
        <Image
          key={index}
          source={{ uri: item }}
          style={{ width: 100, height: 100 }}
        />
      );
    });

    return images;
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    // console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: this.state.image.concat([result.uri]),
      });
      let base64Img = `data:image/jpg;base64,${result.base64}`

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
          console.log("url", data.secure_url)
          const dataUrl = data.secure_url;
          this.setState({photoUrl : data.secure_url});
          this.showImageAfterBackgroundRemoval(dataUrl);
          return data.secure_url
      }).catch(err=>console.log(err))
    }

  };

  render() {
    const logoImage = require('../../assets/overlay_logo.png');
    const floralIcon = require('../../assets/logo_img_sm.png');
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
          <Text style={styles.photoText} onPress={() => this.props.navigation.navigate('Camera')}>
          {this.state.photoText}{'\n'}{'\n'}{'\n'}
          </Text>
          // <Text style={styles.galleryText} onPress={() => this.props.navigation.navigate('Gallery')}>
          // {this.state.galleryText}{'\n'}{'\n'}
          // </Text>
          </Text>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
            color="#c9a5b4"
          />
        <Image
        style={styles.icon_img}
        source={floralIcon} />
        {this._renderImages()}
      </View>
    );
  }
}

// onPress={() => this.props.navigation.navigate('Camera')}

// skip this line if using Create React Native App
AppRegistry.registerComponent('Home', () => Home);
