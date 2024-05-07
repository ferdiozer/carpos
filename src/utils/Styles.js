import {StyleSheet} from 'react-native';
import {height, width} from './Layouts';
import lightTheme from './Theme';

export const style = StyleSheet.create({
  safeArea_Container: {
    backgroundColor: lightTheme.white,
    height: height,
    width: width,
  },
  root_Container: {
    height: height,
    width: width,
    
  },
  menuBtnContainer: {width: '100%', height: '8%', alignSelf: 'center'},
  titleContainer: {width: '90%', height: '6%', bottom: 5, alignSelf: 'center'},
  backButtonBox: {
    width: '90%',
    height: '12%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  BackButtonContainer: {
    width: '90%',
    height: '12%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  topLayer: {height: '15%', width: '100%'},
  header_Image: {height: '100%', width: '100%', resizeMode: 'stretch'},
  shadowEffect: {
    shadowOpacity: 0.2,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 5,
    elevation: 1.8,
    shadowColor: lightTheme.black,
  },
  contentBox: {
    height: '80%',
    width: '100%',
    position: 'absolute',
    marginTop: '24%',
  },
});
