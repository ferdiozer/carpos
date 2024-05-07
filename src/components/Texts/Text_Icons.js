import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Base_Text from './Base_Text'
import lightTheme from '../../utils/Theme';
const Text_Icons = ({
    text,
    fontSize,
    color,
    textAlign,
    Icon,
    left,
    width

}) => {
  return (
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'flex-start',
      width:width||"auto"
      
    }}>
    <View
      style={{
        width: 25,
        height: 25,
        backgroundColor: lightTheme.inputGrey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }}>
      <Icon />
    </View>
    <Base_Text color={color} text={text} fontSize={fontSize} left={left}textAlign={textAlign} />
  </View>
  )
}

export default Text_Icons

const styles = StyleSheet.create({})