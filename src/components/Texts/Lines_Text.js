import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import lightTheme from '../../utils/Theme';
import Base_Text from './Base_Text';

const Lines_Text = ({width, text, fontSize, color, linewidth, bottom}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 40,
        width: width,
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center',
        bottom: bottom,
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: lightTheme.themeColor,
          width: linewidth,
        }}
      />
      <Base_Text text={text} fontSize={fontSize} color={color} />
      <View
        style={{
          borderWidth: 1,
          borderColor: lightTheme.themeColor,
          width: linewidth,
        }}
      />
    </View>
  );
};

export default Lines_Text;

const styles = StyleSheet.create({});
