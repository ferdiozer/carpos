import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Base_Text from './Base_Text';
import lightTheme from '../../utils/Theme';

const Base_label_Text = ({textAlign, left, text, numberOfLines,fontSize,backgroundColor,color}) => {
  return (
    <View style={{width:"auto",height:"auto",alignItems:"flex-start",paddingVertical:5,backgroundColor:lightTheme.lightGrey,paddingHorizontal:6,borderRadius:5}}>
      <Base_Text
        text={text}
        left={left}
        textAlign={textAlign}
        fontSize={fontSize}
        numberOfLines={numberOfLines}
        color={color}
      />
    </View>
  );
};

export default Base_label_Text;

const styles = StyleSheet.create({});
