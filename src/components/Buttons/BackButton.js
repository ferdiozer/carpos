import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import lightTheme from '../../utils/Theme';
const BackButton = ({ height, width, goBackPage }) => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignSelf: 'center',
          alignItems: 'center',
          width: width || '100%',
          height: height || '100%',
        }}>
        <TouchableOpacity
          onPress={() => goBackPage ? navigation?.navigate(goBackPage) : navigation?.goBack()}
          style={styles.btn}>
          <FontAwesome5Icon
            name="chevron-left"
            color={lightTheme.themeColor}
            size={18}
            style={{ fontWeight: 'bold' }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  btn: {
    height: 25,
    width: 25,
    borderRadius: 20,
    backgroundColor: lightTheme.white,
    justifyContent: 'center',
    alignItems: 'center',
    left: 20,
  }
});
