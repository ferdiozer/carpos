import { StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Images } from '../../components/assets/sourceFile';
import { useNavigation } from '@react-navigation/native';
import lightTheme from '../../utils/Theme';
const Button = ({
  width,
  bg_color,
  border_Radius,
  label,
  OnClick,
  isSort,
  border_col,
  isReverse,
  height,
  left,
  fontSize,
  color,
  bw,
  loading
}) => {
  return (
    <TouchableOpacity
      // onPress={!loading ? OnClick : undefined}
      onPress={OnClick}
      style={{
        width: width,
        height: height || '100%',
        backgroundColor: isReverse ? lightTheme.lightGrey : bg_color,
        borderRadius: border_Radius,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: border_col,
        borderWidth: bw || 0,
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowColor: lightTheme.white,
        shadowOffset: { width: 4, height: 4 },
        elevation: 2,
        left: left,
      }}>
      <Text
        style={{
          ...styles.label,
          fontSize: fontSize || 15,
          color: color || lightTheme.white,
        }}>
        {loading ? <ActivityIndicator color={color || lightTheme.white} /> : label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

export const Pencil = ({ onClick, backgroundColor, width, color, alignSelf }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.minButton,
        backgroundColor: backgroundColor || lightTheme.lightGrey,
        height: 26,
        width: width || 32,
        borderRadius: 5,
        alignSelf: alignSelf || "center"
      }}>
      <FontAwesome5Icon name="pen" color={color || lightTheme.white} size={14} />
    </TouchableOpacity>
  );
};

export const ButtonWithIcon = ({ onClick, backgroundColor, width, color, alignSelf, isSvg, height }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.minButton,
        backgroundColor: backgroundColor || lightTheme.lightGrey,
        height: height || 26,
        width: width || 32,
        borderRadius: 5,
        alignSelf: alignSelf || "center",
        paddingHorizontal: 5, paddingVertical: 8

      }}>
      {
        isSvg ? null : <Image
          source={Images.Start}
          style={{ height: "100%", width: "100%", resizeMode: "center", tintColor: lightTheme.Pending }}

        />
      }

    </TouchableOpacity>
  );
};

export const ViewButton = ({ onClick, backgroundColor, color }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.minButton,
        backgroundColor: backgroundColor || lightTheme.lightGrey,
        height: 30,
        width: 40,
        borderRadius: 5,
      }}>
      <FontAwesome5Icon name="eye" color={color || lightTheme.black} />
    </TouchableOpacity>
  );
};

export const Save = ({ onClick, backgroundColor, color, solid, size }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.minButton,
        backgroundColor: backgroundColor || lightTheme.lightGrey,
        height: 30,
        width: 40,
        borderRadius: 5,
      }}>
      <FontAwesome5Icon
        name="bookmark"
        color={color || lightTheme.black}
        solid={solid}
        size={size || 16}
        selectionColor={'red'}
      />
    </TouchableOpacity>
  );
};

export const Menu_Button = ({ onClick, size }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation?.toggleDrawer();
      }}
      style={{ ...styles.minButton, height: '100%' }}>
      <Images.Menu />
    </TouchableOpacity>
  );
};

export const Search_Button = ({ onClick, size }) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ ...styles.minButton, }}>
      <FontAwesome5Icon
        name="magnifying-glass"
        color={lightTheme.black}
        size={size || 25}
      />
    </TouchableOpacity>
  );
};

export const Plus_Button = ({ onClick, size }) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ ...styles.minButton, width: 26, height: 26, backgroundColor: lightTheme.lightGrey }}>
      <FontAwesome5Icon
        name="plus"
        color={lightTheme.themeColor}
        size={size || 25}
      />
    </TouchableOpacity>
  );
};
export const MessageButton = ({ onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{ ...styles.minButton, backgroundColor: lightTheme.DarkGreen }}>
      <FontAwesome5Icon name="comment" color={lightTheme.white} />
    </TouchableOpacity>
  );
};

export const NextButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <FontAwesome5Icon
        name="chevron-right"
        color={lightTheme.themeColor}
        size={18}
        style={{ fontWeight: 'bold' }}
      />
    </TouchableOpacity>
  );
};
// export const DownloadButton = ({onClick}) => {
//   return (
//     <TouchableOpacity
//       onPress={onClick}
//       style={{...styles.minButton, backgroundColor: lightTheme.DarkGreen}}>
//       <DownloadIcon />
//     </TouchableOpacity>
//   );
// };

export const DeleteButton = ({ onClick, backgroundColor }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.minButton,
        backgroundColor: backgroundColor || lightTheme.lightGrey,
        height: 26,
        width: 32,
        borderRadius: 5,
      }}>
      <FontAwesome5Icon name="trash" color={'red'} size={14} />
    </TouchableOpacity>
  );
};

export const TextButton = ({ onClick, label }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
    >
      <Text style={{ color: '#000' }}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  minButton: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -20
  },
  label: {
    color: lightTheme.white,
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn: {
    height: 50,
    width: 50,
    borderRadius: 40,
    backgroundColor: lightTheme.white,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    borderWidth: 1.5,
    borderColor: lightTheme.themeColor,
  },
});
