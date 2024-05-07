import React from 'react';
import { View, Image, Text } from 'react-native';
import lightTheme from '../utils/Theme';


export default ({
    title
}) => {
    return (
        <View style={{
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        }}>
            <View style={{
                padding: 5,
                backgroundColor: '#FFF',
                borderRadius: 5
            }}>
                <Image style={{
                    resizeMode: 'contain',
                    height: 40,
                    width: 40

                }} source={require('./assets/car.png')} />
            </View>
            <Text numberOfLines={1} style={{ color: lightTheme.white, fontSize: 14, marginLeft: 5 }}>
                {title}
            </Text>
        </View>

    )
}



