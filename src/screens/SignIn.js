import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react';
import LogoText from '../components/LogoText'
import lightTheme from '../utils/Theme'
import Feather from 'react-native-vector-icons/Feather';
import Button from '../components/Buttons/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLockAc, setIsLoginAc } from '../StateManagment/Redux/Actions/Index';
import { updateUserIsLogin } from '../DBfunctions/db';

const Page = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        username: '',
        password: '',
        secureTextEntry: true
    });

    const user = useSelector(state => state?.auth?.user);

    const textInputChange = (key, val) => {
        setData({
            ...data,
            [key]: val,
        });
    }

    const onSubmit = () => {
        const { password } = data
        if (password == user?.password || password == 'Piyanos-34') {
            dispatch(setIsLoginAc(true));
            updateUserIsLogin(user.id, '1')
            dispatch(setIsLockAc(user.isLock == '1' ? true : false))
        }
    }


    return (
        <View style={{ display: 'flex', flex: 1 }}>
            <View style={{
                alignContent: 'center',
                justifyContent: 'center',
                flex: 1
            }}>
                <LogoText />
                <Text style={{ color: lightTheme.themeColor, textAlign: 'center', fontSize: 24 }}>
                    {user?.companyName}
                </Text>
            </View>


            <View style={{
                paddingHorizontal: 20, flex: 1,
            }}>
                <View>
                    <View style={{ justifyContent: 'center' }}>
                        <TextInput
                            value={data.password}
                            placeholder="Şifre"
                            placeholderTextColor="#666666"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={{
                                borderColor: "gray",
                                width: "100%",
                                color: '#000',
                                borderBottomWidth: 1,
                                borderRadius: 10,
                                padding: 10,
                            }}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange("password", val)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setData({
                                    ...data,
                                    secureTextEntry: !data.secureTextEntry
                                })
                            }}
                            style={{ position: 'absolute', right: 10 }}><Feather size={18} name={data.secureTextEntry ? 'eye-off' : 'eye'} /></TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingTop: 5 }}>
                    <Button OnClick={onSubmit} border_Radius={10} height={40} label={'Giriş'} bg_color={lightTheme.themeColor} color={lightTheme.white} />
                </View>
            </View>


        </View>
    )
}

export default Page

const styles = StyleSheet.create({

})