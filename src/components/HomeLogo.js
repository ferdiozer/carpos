import React from 'react';
import { View, Image, Text } from 'react-native';
import lightTheme from '../utils/Theme';
import Base_Text from './Texts/Base_Text';


export default ({
    title
}) => {
    return (
        <View style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image style={{
                resizeMode: 'contain',
                height: 100,


            }} source={require('./assets/car.png')} />

            <View style={{ justifyContent: 'center', }}>
                <Base_Text fontSize={14} text={title} />
            </View>
        </View>

    )
}



