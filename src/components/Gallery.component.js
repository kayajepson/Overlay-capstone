import React from 'react';
import { StyleSheet, Button, Image, View } from 'react-native';
import { Constants, ImagePicker } from 'expo';
// import DisplayAnImage from './DisplayAnImage.component.js';

// class SplashScreen extends React.Component {
//   render() {
//     const someLocalImage = require('../../assets/overlay_slide.gif');
//     const styles = StyleSheet.create({
//       container: {
//         flex: 1,
//         resizeMode: 'contain',
//         alignItems: 'center',
//         justifyContent: 'center',
//         // paddingTop: Constants.statusBarHeight,
//         backgroundColor: '#ecf0f1',
//       },
//     });
//
//     return (
//       <View style={styles.container}>
//       <Image
//       style={{width: 300, height: 200}}
//       source={someLocalImage} />
//       </View>
//     );
//   }
// }


export default class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
      image:[],
    }
  }

  // state = {
  //   image: [],
  //   // photoUrl: null,
  // };

  render() {
    // if (this.state.isLoading) {
    //   return <SplashScreen />;
    // }
    // let { image } = this.state;


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
          color="#c9a5b4"
        />
        {this._renderImages()}
      </View>
    );

  }

  propsUpdated() {
    console.log(this.state);
  }

  showImageAfterBackgroundRemoval(photoUrl){
    this.props.navigation.navigate('DisplayAnImage', {
    photoUrl: photoUrl
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
          // this.setState({photoUrl : data.secure_url});
          this.showImageAfterBackgroundRemoval(dataUrl);
          return data.secure_url
      }).catch(err=>console.log(err))
    }

  };

  //to remove background, change setting in cloudinary to auto remove on upload.
}
