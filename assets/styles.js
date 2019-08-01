import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import {Platform} from 'react-native';
export default StyleSheet.create({
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
