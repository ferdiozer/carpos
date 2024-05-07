import { StyleSheet, StatusBar } from 'react-native';
import React from 'react';
import RootStack from './src/navigation/RootStack'
import { Provider } from 'react-redux';
import { store } from './src/StateManagment/Redux/Store/Index';
import "moment/locale/tr";
import { LogBox } from 'react-native';
import lightTheme from './src/utils/Theme';
import './src/localization/i18n'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar translucent backgroundColor={lightTheme.themeColor} barStyle='light-content' />
        <RootStack />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
