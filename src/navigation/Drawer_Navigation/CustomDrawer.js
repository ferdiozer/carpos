import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  Image,
  Share,
  Linking
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Base_Text from '../../components/Texts/Base_Text';
import { useNavigation } from '@react-navigation/native';
import lightTheme from '../../utils/Theme';
import { onNavigate } from '../Methods';
import { useSelector, useDispatch } from 'react-redux';
import DrawerLogo from '../../components/DrawerLogo';
import { navigationLockedRoutes, navigationRoutes, siteInfo } from '../../Config/env';

const CustomDrawer = props => {
  const navigation = useNavigation();

  const user = useSelector(state => state?.auth?.user);
  const isLock = useSelector(state => state?.auth?.isLock);

  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
    // }
  }, []);




  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            //  height: '12%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <View style={styles.ProfileBox}>

            <View>
              <DrawerLogo title={user?.companyName} />
            </View>


          </View>
        </View>
        <DrawerContentScrollView
          style={{ zIndex: -1 }}
          {...props}
          showsVerticalScrollIndicator={false}>

          {
            Object.keys(navigationRoutes).map(v => (
              <View
                key={v}
                style={{ width: '90%' }}
                useNativeDriver={true}>
                <TouchableOpacity
                  onPress={() => {
                    onNavigate(navigation, v)
                  }
                  }
                  style={{
                    height: 45,
                    backgroundColor: lightTheme.lightSilver,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: 5
                  }}>
                  <Base_Text numberOfLines={1} text={navigationRoutes[v].label}
                    width={"70%"}
                    textAlign={"left"}
                    color={lightTheme.lightBlack}
                  />
                </TouchableOpacity>
              </View>
            ))
          }

          {
            !isLock &&
            Object.keys(navigationLockedRoutes).map(v => (
              <View
                key={v}
                style={{ width: '90%' }}
                useNativeDriver={true}>
                <TouchableOpacity
                  onPress={() => {
                    onNavigate(navigation, v)
                  }
                  }
                  style={{
                    height: 45,
                    backgroundColor: lightTheme.lightSilver,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginBottom: 5
                  }}>
                  <Base_Text numberOfLines={1} text={navigationLockedRoutes[v].label}
                    width={"70%"}
                    textAlign={"left"}
                    color={lightTheme.lightBlack}
                  />
                </TouchableOpacity>
              </View>
            ))
          }

        </DrawerContentScrollView>

      </View>
    </>
  );
};

export default CustomDrawer;
const styles = StyleSheet.create({
  BTN2: {
    width: '80%',
    height: 40,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 3,
    borderColor: lightTheme.inputGrey,
  },
  ProfileBox: {
    height: 100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: lightTheme.themeColor
  },
});
