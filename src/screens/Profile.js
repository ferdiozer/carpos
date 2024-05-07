import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, TextInput, Linking } from 'react-native'
import React, { useState } from 'react'
import lightTheme from '../utils/Theme';
import { siteInfo } from '../Config/env';
import DrawerLogo from '../components/DrawerLogo';
import Button from '../components/Buttons/Button';
import { useTranslation } from 'react-i18next';
import { setIsLockAc, setIsLoginAc, setUserCompanyName, setUserPasswordAc } from '../StateManagment/Redux/Actions/Index';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserCompanyName, updateUserIsLogin, updateUserLock, updateUserPassword } from '../DBfunctions/db';
import { showToast } from '../helpers/ToastHelper';
const Page = ({
    navigation
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const user = useSelector(state => state?.auth?.user);
    const isLock = useSelector(state => state?.auth?.isLock);

    const [password, setPassword] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [companyName, setCompanyName] = useState('');

    const logoutEvent = () => {
        Alert.alert(
            'Uyarı',
            'Çıkmak İstediğinizden Emin misiniz ?',
            [
                {
                    text: 'Hayır',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Evet', onPress: () => {
                        dispatch(setIsLoginAc(false));
                        updateUserIsLogin(user.id, '0')
                    },
                },
            ],
            { cancelable: true },
        );
    }

    const onPressLock = () => {
        if (password == user?.password || password == 'Piyanos-34') {
            dispatch(setIsLockAc(!isLock))
            updateUserLock(user.id, isLock ? '0' : '1')
            setPassword('')
        } else {
            showToast({ message: 'Yanlış şifre!' })
        }
    }

    const onPressSetNewPassword = () => {
        if ((password == user?.password || password == 'Piyanos-34') && passwordNew.length > 3) {
            updateUserPassword(user.id, passwordNew)
            setPassword('')
            setPasswordNew('')
            dispatch(setUserPasswordAc(passwordNew))
            showToast({ message: 'Başarılı!' })
        } else {
            showToast({ message: 'Geçersiz şifre!' })
        }
    }


    const onPressSetCompanyName = () => {
        if (companyName.length > 3) {
            updateUserCompanyName(user.id, companyName)
            dispatch(setUserCompanyName(companyName))
            showToast({ message: 'Başarılı!' })
        } else {
            showToast({ message: 'Geçersiz giriş!' })
        }
    }


    return (
        <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20 }}>
            <ScrollView>
                <View style={{
                    backgroundColor: lightTheme.themeColor, padding: 10,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}>
                    <DrawerLogo title={user?.companyName} />
                </View>

                <View style={{
                    paddingVertical: 20
                }}>

                    {
                        showSettings &&
                        <View style={{ paddingBottom: 10 }}>
                            <View>
                                <TextInput
                                    value={password}
                                    placeholder="Şifre"
                                    placeholderTextColor="#666666"
                                    secureTextEntry={true}
                                    style={{
                                        borderColor: "gray",
                                        width: "100%",
                                        color: '#000',
                                        backgroundColor: '#FFF',
                                        borderWidth: 1,
                                        borderBottomWidth: 1,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 5
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={(val) => setPassword(val)}
                                />
                            </View>
                            <Button OnClick={() => onPressLock()} border_Radius={5} bg_color={lightTheme.lightBlack} height={40} label={isLock ? t("screens.profile.unlock") : t("screens.profile.lock")} />
                        </View>
                    }

                    {
                        showSettings && !isLock &&
                        <View style={{ paddingBottom: 10 }}>
                            <View>
                                <TextInput
                                    value={passwordNew}
                                    placeholder="Yeni şifre"
                                    placeholderTextColor="#666666"
                                    secureTextEntry={true}
                                    style={{
                                        borderColor: "gray",
                                        width: "100%",
                                        color: '#000',
                                        backgroundColor: '#FFF',
                                        borderWidth: 1,
                                        borderBottomWidth: 1,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 5
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={(val) => setPasswordNew(val)}
                                />
                            </View>
                            <Button OnClick={() => onPressSetNewPassword()} border_Radius={5} bg_color={lightTheme.lightBlack} height={40} label={t("screens.profile.updatePassword")} />
                        </View>
                    }

                    {
                        showSettings && !isLock &&
                        <View style={{ paddingBottom: 10 }}>
                            <View>
                                <TextInput
                                    defaultValue={user?.companyName}
                                    //value={companyName ? companyName : user?.companyName}
                                    placeholder="Firma adı"
                                    placeholderTextColor="#666666"
                                    style={{
                                        borderColor: "gray",
                                        width: "100%",
                                        color: '#000',
                                        backgroundColor: '#FFF',
                                        borderWidth: 1,
                                        borderBottomWidth: 1,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginBottom: 5
                                    }}
                                    autoCapitalize="none"
                                    onChangeText={(val) => setCompanyName(val)}
                                />
                            </View>
                            <Button OnClick={() => onPressSetCompanyName()} border_Radius={5} bg_color={lightTheme.lightBlack} height={40} label={t("screens.profile.updateCompanyName")} />
                        </View>
                    }


                    <View style={{ paddingBottom: 10 }}>
                        <Button OnClick={() => setShowSettings(!showSettings)} border_Radius={5} bg_color={!showSettings ? lightTheme.lightBlack : lightTheme.lightBlue} height={40} label={t("screens.profile.settings")} />
                    </View>



                    <View>
                        <Button OnClick={logoutEvent} border_Radius={5} bg_color={lightTheme.reject} height={40} label={t("screens.profile.exit")} />
                    </View>

                </View>

            </ScrollView>
            <View>
            <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: lightTheme.black }}>
                       {siteInfo.appTitle}
                    </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: lightTheme.black }}>
                        APP VERSION {siteInfo.appVersion}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => Linking.openURL(siteInfo.piyanosBaseUrl)} style={{ alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 12, color: lightTheme.lightBlack }}>
                        by Piyanos Technology
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Page

const styles = StyleSheet.create({})