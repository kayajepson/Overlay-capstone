import React from 'react';
import { Button, Image, View } from 'react-native';
import { Constants, ImagePicker } from 'expo';

export default class Gallery extends React.Component {
  state = {
    image: [],
  };

  render() {
    // let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {this._renderImages()}
      </View>
    );
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

    console.log(result);

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
          console.log(data.secure_url)
          return data.secure_url
      }).catch(err=>console.log(err))



    }
  };
}
