import React from 'react';
import { View, Image } from 'react-native';


export default ({
    height = 80
}) => {
    return (
        <View style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image style={{
                resizeMode: 'contain',
                height: height,
                maxWidth: '100%',
            }} source={require('./assets/car.png')} />
        </View>

    )
}



