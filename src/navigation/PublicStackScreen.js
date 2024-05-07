import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignIn';


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
    return (
        <RootStack.Navigator headerMode='none'
            // initialRouteName={'SignUpScreen'}
        >
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        </RootStack.Navigator>
    );
}

export default RootStackScreen;