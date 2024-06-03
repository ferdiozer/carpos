import { StyleSheet, View, Text, Alert, BackHandler, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { height } from '../utils/Layouts'
import Drawer_Index from './Drawer_Navigation/Index';
import PublicStackScreen from './PublicStackScreen';

import LoadingMain from '../components/LoadingMain';

import { setIsLockAc, setIsLoginAc, setSettingsAc, setTariffsAc, setUserAc, setVehicleTypesAc } from '../StateManagment/Redux/Actions/Index'

import { useSelector, useDispatch } from 'react-redux';


import lightTheme from '../utils/Theme';
import { addSettings, addUser, createTables, getSettings, getTariff, getUsers, getVehicleTypes } from '../DBfunctions/db';

const Stack = createNativeStackNavigator();

const RootStack = () => {

  const dispatch = useDispatch();
  const token = useSelector(state => state?.auth?.token);
  const user = useSelector(state => state?.auth?.user);
  const isLogin = useSelector(state => state?.auth?.isLogin);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   initDb()
  // }, [isLogin]);

  useEffect(() => {
    initDb()
  }, []);


  const initDb = async () => {
    try {
      setLoading(true)
      await createTables()
      const localUsers = await getUsers();
      if (localUsers.length == 0) {
        //init user
        await addUser('User', 'Otopark', '1234')
      }
      await getMeData()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getMeData = async () => {
    try {
      setLoading(true)
      const localUsers = await getUsers();
      const vehicleTypes = await getVehicleTypes();
      const tariffList = await getTariff();
      let settings = await getSettings();
      if (!settings) {
        await addSettings('', '', '', '', 0, 0)
        settings = await getSettings();
      }
      if (localUsers.length > 0) {
        const user = localUsers[localUsers.length - 1]
        const userIsLogin = user.isLogin == '1' ? true : false
        dispatch(setSettingsAc(settings))
        dispatch(setVehicleTypesAc(vehicleTypes))
        dispatch(setIsLockAc(user.isLock == '1' ? true : false))
        dispatch(setUserAc(user))
        dispatch(setTariffsAc(tariffList))

        if (userIsLogin) {
          dispatch(setIsLoginAc(true))
        } else {
          dispatch(setIsLoginAc(false))
        }
      } else {
        dispatch(setIsLoginAc(false))
      }
    } catch (error) {
      dispatch(setIsLoginAc(false))
    } finally {
      setLoading(false)
    }
  }


  return (
    <>

      <View style={{ height: height }}>
        <View style={{ height: Platform.OS == 'ios' ? 60 : 20, backgroundColor: lightTheme.themeColor }}></View>
        <NavigationContainer>
          {loading && <LoadingMain />}
          {
            isLogin
              ?
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  animationTypeForReplace: 'push',
                  animationDuration: 1000,
                }}>
                <Stack.Screen name="MainScreen" component={Drawer_Index} />
              </Stack.Navigator>
              :
              <PublicStackScreen />
          }
        </NavigationContainer>

      </View>
    </>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
