//https://snack.expo.io/@jhalborg/sticker-example

import * as React from 'react';
import { Animated, StyleSheet, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { PanGestureHandler, PinchGestureHandler, RotationGestureHandler, State } from 'react-native-gesture-handler';

const USE_NATIVE_DRIVER = false; // https://github.com/kmagiera/react-native-gesture-handler/issues/71
const MINIMUM_STICKER_SCALE = 0.25;
const MAXIMUM_STICKER_SCALE = 2.5;

class CameraAgain extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
          </Camera>
        </View>
      );
    }
  }
}


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
    this.overlayUrl = props.navigation.state.params.photoUrl

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
    const panStyle = {
      transform: [{ translateX }, { translateY }],
    };
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
          </Camera>
      </View>
    )
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
          </Camera>
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
                    uri: this.overlayUrl,
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
    height: imageSize,
    width: imageSize
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
});
