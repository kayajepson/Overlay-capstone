import React, { Component } from 'react';
import { View, Image, Text} from 'react-native';

export default function DisplayAnImage(photoUrl) {

  console.log("display", photoUrl);
  return (
    <View>
    <Text>
    Youre here
    </Text>
    <Image
      style={{ width: 66, height: 58 }}
      source={{
        uri: photoUrl.navigation.state.params.photoUrl,
      }}
    />
  </View>
  );
}
