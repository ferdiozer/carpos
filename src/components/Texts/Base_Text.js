import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import lightTheme from '../../utils/Theme';

const Base_Text = ({
  text,
  color,
  textAlign,
  fontSize,
  fontWeight,
  bottom,
  left,
  letterSpacing,
  numberOfLines,
  width
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: color || lightTheme.black,
        fontSize: fontSize || 13,
        textAlign: textAlign || 'center',
        fontWeight: fontWeight || '700',
        bottom: bottom,
        left: left,
        letterSpacing: letterSpacing || 0,
        width: width || "auto"
      }}>
      {text}
    </Text>
  );
};

export default Base_Text;

const styles = StyleSheet.create({});
