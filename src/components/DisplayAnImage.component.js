import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Platform} from 'react-native';

export default class DisplayAnImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
      image:[],
    }
  }


  // _pickImage {
  //   let result = props.photoUrl.navigation.state.params.photoUrl;
  //   // let result = await ImagePicker.launchImageLibraryAsync({
  //   //   allowsEditing: true,
  //   //   aspect: [4, 3],
  //   //   base64: true
  //   // });
  //   //
  //   // // console.log(result);
  //   //
  //   // if (!result.cancelled) {
  //     this.setState({
  //       image: this.state.image.concat([result.uri]),
  //     });
  //     let base64Img = `data:image/jpg;base64,${result.base64}`
  //
  //     //Add your cloud name
  //     let apiUrl = 'https://api.cloudinary.com/v1_1/dzooqxmw2/image/upload';
  //
  //     let data = {
  //       "file": base64Img,
  //       "upload_preset": "hwlhaluq",
  //     }
  //
  //     fetch(apiUrl, {
  //       body: JSON.stringify(data),
  //       headers: {
  //         'content-type': 'application/json'
  //       },
  //       method: 'POST',
  //     }).then(async r => {
  //         let data = await r.json()
  //         const dataUrl = data.secure_url;
  //         this.setState({photoUrl : data.secure_url});
  //         this.showImageAfterBackgroundRemoval(dataUrl);
  //         return data.secure_url
  //     }).catch(err=>console.log(err))
  //   }
  // const logoImage = require('../../assets/overlay_logo.png');
  render() {
    console.log("img props", props);
    return (
      <View style={styles.container}>
      <Image
      style={styles.logo_img}
      source={logoImage} />
      <Image
      // style={styles.image}
      style={{ width: 300, height: 500 }}
      source={{
        uri: photoUrl.navigation.state.params.photoUrl,
      }}
      />
      <Text style={styles.uploadText} onPress={() => this._pickImage}>
      UPLOAD
      {'\n'}{'\n'}{'\n'}
      </Text>
      <Text style={styles.retakeText} onPress={() => this.props.navigation.navigate('Camera')}>
      RETAKE
      {'\n'}{'\n'}
      </Text>
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
    backgroundColor: '#F5FCFF',
  },
  image: {
    flex: 4,
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
    position: 'absolute',
    width: 300,
    height: 200
  }
});
