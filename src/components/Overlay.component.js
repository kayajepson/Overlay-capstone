//https://snack.expo.io/@jhalborg/sticker-example

import * as React from 'react';
import { Animated, StyleSheet, View, Image, ImageBackground, Dimensions } from 'react-native';

import { PanGestureHandler, PinchGestureHandler, RotationGestureHandler, State } from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = false; // https://github.com/kmagiera/react-native-gesture-handler/issues/71
const MINIMUM_STICKER_SCALE = 0.25;
const MAXIMUM_STICKER_SCALE = 2.5;

export class Sticker extends React.Component {
  onPanGestureEvent: (...args: any[]) => void;
  lastOffset: { x: number; y: number };
  translateY: Animated.Value;
  translateX: Animated.Value;
  onRotateGestureEvent: (...args: any[]) => void;
  lastRotate: number;
  rotateStr: Animated.AnimatedInterpolation;
  rotate: Animated.Value;
  onPinchGestureEvent: (...args: any[]) => void;
  lastScale: number;
  scale: Animated.AnimatedMultiplication;
  pinchScale: Animated.Value;
  baseScale: Animated.Value;

  constructor(props) {
    super(props);
    this.overlayUrl = props.navigation.state.params.photoUrl;

    /* Pinching */
    this.baseScale = new Animated.Value(1);
    this.pinchScale = new Animated.Value(1);
    this.scale = this.pinchScale.interpolate({
      inputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
      outputRange: [MINIMUM_STICKER_SCALE, MAXIMUM_STICKER_SCALE],
      extrapolate: 'clamp',
    });
    this.lastScale = 1;

    this.onPinchGestureEvent = Animated.event(
      [{ nativeEvent: { scale: this.pinchScale } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    /* Rotation */
    this.rotate = new Animated.Value(0);
    this.rotateStr = this.rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    });
    this.lastRotate = 0;
    this.onRotateGestureEvent = Animated.event(
      [{ nativeEvent: { rotation: this.rotate } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );

    /* Pan */
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.lastOffset = { x: 0, y: 0 };
    this.onPanGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
          },
        },
      ],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }

  onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastRotate += event.nativeEvent.rotation;
      this.rotate.setOffset(this.lastRotate);
      this.rotate.setValue(0);
    }
  };

  onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastScale *= event.nativeEvent.scale;
      this.baseScale.setValue(this.lastScale);
      // this.pinchScale.setValue(1);
    }
  };

  onPanStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);
    }
  };

  render() {
    const translateX = this.translateX;
    const translateY = this.translateY;
    const logoImage = require('../../assets/logo.png');
    const floralIcon = require('../../assets/logo_img_sm.png');
    const panStyle = {
      transform: [{ translateX }, { translateY }],
    };
    return (
      <View style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center', flex: 1}}>
        <ImageBackground source={{uri: 'https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}} style={styles.backgroundImage}>
        <Image style={styles.logo_img} source={logoImage} />
        </ImageBackground>

        <PanGestureHandler
          {...this.props}
          onGestureEvent={this.onPanGestureEvent}
          onHandlerStateChange={this.onPanStateChange}
          id="image_drag"
          simultaneousHandlers={['image_pinch', 'image_rotation']}
          shouldCancelWhenOutside={true}
        >
          <RotationGestureHandler
            id="image_rotation"
            simultaneousHandlers={['image_pinch', 'image_drag']}
            onGestureEvent={this.onRotateGestureEvent}
            onHandlerStateChange={this.onRotateHandlerStateChange}
          >
            <PinchGestureHandler
              id="image_pinch"
              simultaneousHandlers={['image_rotation', 'image_drag']}
              onGestureEvent={this.onPinchGestureEvent}
              onHandlerStateChange={this.onPinchHandlerStateChange}
            >
              <Animated.View
                style={[panStyle, styles.stickerContainer]}
                collapsable={false}
              >
                <Animated.Image
                  style={[
                    styles.pinchableImage,
                    {
                      transform: [
                        { perspective: 200 },
                        { scale: this.scale },
                        { rotate: this.rotateStr },
                        // { translateX: this.translateX },
                        // { translateY: this.translateY },
                      ],
                    },
                  ]}
                  source={{
                    uri:
                      this.overlayUrl,
                  }}
                />
              </Animated.View>
            </PinchGestureHandler>
          </RotationGestureHandler>
        </PanGestureHandler>
      </View>
    );
  }
}

export default Sticker;

const imageSize = 400
const stickerCanvasSize = imageSize * 2
const styles = StyleSheet.create({
  stickerContainer: {
    position: 'absolute',
    height: stickerCanvasSize,
    width: stickerCanvasSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 5,
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
  logo_img: {
    resizeMode: 'contain',
    flex: 1,
    width: 300,
    height: 200,
    left: '10%',
    position: 'absolute'
  }
});
