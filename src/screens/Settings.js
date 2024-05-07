import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, TextInput, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import lightTheme from '../utils/Theme';
import Button from '../components/Buttons/Button';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../helpers/ToastHelper';
import { onNavigate } from '../navigation/Methods';
import Base_Text from '../components/Texts/Base_Text';
import { getSettings, updateSettings } from '../DBfunctions/db';
import { setSettingsAc } from '../StateManagment/Redux/Actions/Index';
import { useIsFocused } from '@react-navigation/native';
const Page = ({
    navigation
}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.auth?.user);
    const settings = useSelector(state => state?.auth?.settings);

    const [localSettings, setLocalSettings] = useState({
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        phoneNumber: '',
        carInPrint: 0,
        carOutPrint: 0

    });

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSettingsFromDb()
        }
    }, [isFocused]);

    const setSettingsFromDb = async () => {
        try {
            let settingsDb = await getSettings();
            setLocalSettings(settingsDb)
            dispatch(setSettingsAc(settingsDb))
        } catch (error) {
            console.error(error)
        }
    }


    const onSubmit = async () => {
        try {
            const updated = await updateSettings(settings.id, localSettings.addressLine1, localSettings.addressLine2, localSettings.addressLine3, localSettings.phoneNumber, localSettings.carInPrint, localSettings.carOutPrint)
            setSettingsFromDb()
            showToast({ message: 'Başarılı' })
        } catch (error) {
            console.error(error)
        }

    }


    return (
        <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 20, backgroundColor: lightTheme.input_BG_color }}>
            <ScrollView>
                <View style={{
                    paddingVertical: 20
                }}>

                    <View>
                        <Base_Text color={lightTheme.themeColor} text={user.companyName} fontSize={20} bottom={10} />
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <Base_Text bottom={5} text={'Adres 1'} textAlign={'left'} />
                        <TextInput
                            defaultValue={settings?.addressLine1}
                            placeholderTextColor="#666666"
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            onChangeText={(val) => setLocalSettings({
                                ...localSettings,
                                addressLine1: val
                            })}
                        />
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Base_Text bottom={5} text={'Adres 2'} textAlign={'left'} />
                        <TextInput
                            defaultValue={settings?.addressLine2}
                            placeholderTextColor="#666666"
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            onChangeText={(val) => setLocalSettings({
                                ...localSettings,
                                addressLine2: val
                            })}
                        />
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Base_Text bottom={5} text={'Adres 3'} textAlign={'left'} />
                        <TextInput
                            defaultValue={settings?.addressLine3}
                            placeholderTextColor="#666666"
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            onChangeText={(val) => setLocalSettings({
                                ...localSettings,
                                addressLine3: val
                            })}
                        />
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <Base_Text bottom={5} text={'Telefon Numarası'} textAlign={'left'} />
                        <TextInput
                            keyboardType='number-pad'
                            defaultValue={settings?.phoneNumber}
                            placeholderTextColor="#666666"
                            style={styles.inputStyle}
                            autoCapitalize="none"
                            onChangeText={(val) => setLocalSettings({
                                ...localSettings,
                                phoneNumber: val
                            })}
                        />
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <Base_Text bottom={5} text={'Araç girişi sırasında fiş yazılsın mı?'} textAlign={'left'} />
                        <Button OnClick={() => {
                            setLocalSettings({
                                ...localSettings,
                                carInPrint: !localSettings.carInPrint
                            })
                        }} border_Radius={5} bg_color={localSettings.carInPrint ? lightTheme.Accept : lightTheme.reject} height={40} label={localSettings.carInPrint ? 'Evet' : 'Hayır'} />
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                        <Base_Text bottom={5} text={'Araç çıkışı sırasında fiş yazılsın mı?'} textAlign={'left'} />
                        <Button OnClick={() => {
                            setLocalSettings({
                                ...localSettings,
                                carOutPrint: !localSettings.carOutPrint
                            })
                        }} border_Radius={5} bg_color={localSettings.carOutPrint ? lightTheme.Accept : lightTheme.reject} height={40} label={localSettings.carOutPrint ? 'Evet' : 'Hayır'} />
                    </View>

                    <View style={{ paddingBottom: 10 }}>
                        <Button OnClick={() => onSubmit()} border_Radius={5} bg_color={lightTheme.black} height={40} label={'Kaydet'} />
                    </View>



                    <View>
                        <Button OnClick={() => onNavigate(navigation, 'Home')} border_Radius={5} bg_color={lightTheme.lightBlack} height={40} label={"Anasayfa"} />
                    </View>

                </View>

            </ScrollView>
        </View>
    )
}

export default Page

const styles = StyleSheet.create({
    inputStyle: {
        borderColor: "gray",
        width: "100%",
        color: '#000',
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5
    }
})