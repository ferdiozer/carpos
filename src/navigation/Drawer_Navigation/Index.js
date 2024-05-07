import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import lightTheme from '../../utils/Theme';
import { navigationLockedRoutes, navigationRoutes, siteInfo } from '../../Config/env';
import { useSelector, useDispatch } from 'react-redux';
import Home from '../../screens/Home';
import VehicleEntrance from '../../screens/VehicleEntrance';
import VehicleExit from '../../screens/VehicleExit';
import Profile from '../../screens/Profile';
import VehicleTypes from '../../screens/VehicleTypes';
import Settings from '../../screens/Settings';
import CarParking from '../../screens/CarParking';
import Report from '../../screens/Report';

const Drawer = createDrawerNavigator();
const Drawer_Index = () => {
  const user = useSelector(state => state?.auth?.user);
  return (
    <Drawer.Navigator

      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: lightTheme.themeColor,
        },
        headerTitleStyle: {
          color: lightTheme.white
        }
        //  headerShown: false,
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" options={{ title: user?.companyName }} component={Home} />
      <Drawer.Screen name="VehicleEntrance" options={{ title: navigationRoutes.VehicleEntrance.label }} component={VehicleEntrance} />
      <Drawer.Screen name="VehicleExit" options={{ title: navigationRoutes.VehicleExit.label }} component={VehicleExit} />
      <Drawer.Screen name="CarParking" options={{ title: navigationRoutes.CarParking.label }} component={CarParking} />
      <Drawer.Screen name="Profile" options={{ title: navigationRoutes.Profile.label }} component={Profile} />
      <Drawer.Screen name="VehicleTypes" options={{ title: navigationLockedRoutes.VehicleTypes.label }} component={VehicleTypes} />
      <Drawer.Screen name="Settings" options={{ title: navigationLockedRoutes.Settings.label }} component={Settings} />
      <Drawer.Screen name="Report" options={{ title: navigationLockedRoutes.Report.label }} component={Report} />
    </Drawer.Navigator>
  );
};

export default Drawer_Index;

