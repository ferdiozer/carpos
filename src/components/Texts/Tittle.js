import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import lightTheme from '../../utils/Theme';

const Tittle = ({width, text, bw, font_Size, left, borCol}) => {

  return Platform.OS == 'ios' ? (
    <View
      style={{
        borderBottomWidth: bw,
        ...styles.commonText,
        borderBottomWidth: bw,
        fontSize: font_Size || 18,
        borderColor: borCol || lightTheme.themeColor,
        left: left,
        height: 30,
      }}>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          ...styles.commonText,
          fontSize: font_Size || 18,
          // left: left,
          // paddingVertical: 10
        }}>
        {text}
      </Text>
    </View>
  ) : (
    <Text
      numberOfLines={2}
      ellipsizeMode="tail"
      style={{
        ...styles.commonText,
        fontSize: font_Size || 18,
        left: left,
        borderBottomWidth: bw,
        borderBottomColor: borCol || lightTheme.themeColor,
        // paddingBottom:5,
        height: null,
      }}>
      {text}
    </Text>
  );
  // }else{

  // }
};

export default Tittle;

const styles = StyleSheet.create({
  commonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightTheme.black,
    height: '100%',
    textAlignVertical: 'center',
    minWidth: 20,
    alignSelf: 'flex-start',
  },
});
