import {StyleSheet, View} from 'react-native';
import React from 'react';
import Base_Text from './Base_Text';
import lightTheme from '../../utils/Theme';
import {style} from '../../utils/Styles';
const View_Text = ({
  height,
  width,
  justifyContent,
  flexDirection,
  text_1st,
  text_1st_fontsize,
  text_2nd_fontsize,
  text_2nd,
  backgroundColor,
  text_1st_color,
  text_2nd_color,
  shadowColor,
  text_1st_textAlign
}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: justifyContent || 'space-around',
        flexDirection: flexDirection || 'row',
        backgroundColor: backgroundColor || lightTheme.inputGrey,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        ...style.shadowEffect,
        shadowColor: shadowColor || lightTheme.inputGrey,
        shadowOffset: {width: 10, height: 10},
        elevation: 5,
        shadowRadius: 20,
        shadowOpacity: 0.6,
      }}>
      <Base_Text
        text={text_1st}
        fontSize={text_1st_fontsize}
        color={text_1st_color}
        textAlign={text_1st_textAlign}
      />
      <Base_Text
        text={text_2nd}
        fontSize={text_2nd_fontsize}
        color={text_2nd_color}
      />
    </View>
  );
};

export default View_Text;

const styles = StyleSheet.create({});
