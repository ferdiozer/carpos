import { StyleSheet, View, Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import Base_Text from '../Texts/Base_Text';
import { TouchableOpacity } from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import { style } from '../../utils/Styles';
import lightTheme from '../../utils/Theme';

const Service_Button = ({
  item,
  LeftIcon,
  RightIcon,
  color,
  LineColor,
  OnPress,
  backgroundColor,
  width,
  isRightClick,
  height,
  isShowLine,
  isBadge,
  badgeType,
  badgeValue,
  widthIcon
}) => {
  const [angle, setAngle] = useState(0);
  const [outputRange, setoutputRange] = useState(['0deg', '180deg']);
  const rotateAnimation = new Animated.Value(angle);
  const rotateLine = async () => {

    const nextAngle = angle + 360;
    setAngle(nextAngle % 360);
    Animated.timing(rotateAnimation, {
      toValue: nextAngle,
      duration: 230,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      OnPress();
      if (outputRange[1] == '-180deg') {
        setoutputRange(['0deg', '180deg']);
      } else {
        setoutputRange(['0deg', '-180deg']);
      }
    });
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateAnimation.interpolate({
          inputRange: [0, 360],
          outputRange: outputRange,
        }),
      },
    ],
  };

  return (
    <TouchableOpacity
      disabled={isRightClick}
      onPress={async () => {
        isShowLine ?
          await rotateLine() :
          OnPress();
      }}
      style={{ ...styles.container, backgroundColor: backgroundColor, height: height || 45, width: widthIcon }}>
      <View style={styles.iconBox}>{LeftIcon && <LeftIcon />}</View>
      {
        isShowLine && <Animated.View
          style={[
            {
              height: '60%',
              width: 2,
              backgroundColor: LineColor || lightTheme.lightBlue,
            },
            rotateStyle,
          ]}
        />
      }

      <View style={{ width: width || '80%', flexDirection: "row" }}>
        <Base_Text text={item?.label} textAlign="left" left={5} color={color} />
        {
          isBadge && <Badge value={badgeValue} status={badgeType}
            containerStyle={{ position: 'absolute', right: 4 }}
          />
        }


      </View>
      <TouchableOpacity
        onPress={() => {
          isRightClick && Promise.all([rotateLine()]);
        }}
        style={{ right: 10 }}>
        <RightIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Service_Button;

const styles = StyleSheet.create({
  iconBox: {
    height: '60%',
    width: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: lightTheme.lightBlue,
  },
  container: {
    width: '95%',
    height: 45,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...style.shadowEffect,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 5.8,
    shadowColor: lightTheme.themeColor,
    elevation: 1.2,
  },
});
