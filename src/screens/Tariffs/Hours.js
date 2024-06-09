import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Buttons/Button'
import lightTheme from '../../utils/Theme'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Base_Text from '../../components/Texts/Base_Text'
import { useSelector, useDispatch } from 'react-redux';
import { addHour, deleteHour, getHours, updateHour } from '../../DBfunctions/db'
import { showToast } from '../../helpers/ToastHelper'
import { setHoursAc } from '../../StateManagment/Redux/Actions/Index'
const Page = ({
    navigation
}) => {
    const dispatch = useDispatch();
    const vehicleHours = useSelector(state => state?.auth?.vehicleHours);
    const [itemId, setItemId] = useState('');
    const [itemHour2, setItemHour2] = useState('');
    const [showModal, setShowModal] = useState(false);


    const setVehicleHours = async () => {
        try {
            const items = await getHours();
            dispatch(setHoursAc(items))
        } catch (error) {
            console.error(error)
        }
    }
    const onSubmit = async () => {
        if (!isNaN(Number(itemHour2))) {
            try {
                if (itemId) {
                    //update
                    await updateHour(itemId, Number(itemHour2))
                } else {
                    //new
                    await addHour(Number(itemHour2))
                }
                setItemId('')
                setItemHour2('')
                showToast({ message: 'Başarılı!' })
                setVehicleHours()
                setShowModal(false)
            } catch (error) {
                console.error(error)
            }
        } else {
            showToast({ message: 'Hatalı giriş!' })
        }
    }

    const onPressDelete = (item) => {
        Alert.alert(
            'Uyarı',
            `silmek istediğinizden emin misiniz?`,
            [
                {
                    text: 'Hayır',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Evet', onPress: async () => {
                        await deleteHour(item.id)
                        setVehicleHours()
                    },
                },
            ],
            { cancelable: true },
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => setShowModal(!showModal)} style={{ backgroundColor: lightTheme.white, padding: 5, borderRadius: 5 }}>
                        <AntDesign name='plus' size={30} color={lightTheme.black} />
                    </TouchableOpacity>
                </View>}
                ListHeaderComponentStyle={{
                    paddingBottom: 20
                }}
                data={vehicleHours}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 20, justifyContent: 'center' }}
                ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                renderItem={({ item }) => {
                    return <View key={item.id}
                        style={{
                            backgroundColor: lightTheme.input_BG_color,
                            padding: 10,
                            borderRadius: 5
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Base_Text left={10} text={item.hour2} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    setItemId(item.id)
                                    setItemHour2(item.hour2)
                                    setShowModal(true)
                                }}>
                                    <AntDesign name='edit' size={22} color={lightTheme.black} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => onPressDelete(item)}>
                                    <AntDesign style={{ marginLeft: 10 }} name='delete' size={22} color={lightTheme.black} />
                                </TouchableOpacity>


                            </View>
                        </View>
                    </View>
                }}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal)
                }}

            >
                <View style={{
                    backgroundColor: lightTheme.lightGrey,
                    flex: 1,

                    padding: 10
                }}>

                    <View style={{ paddingVertical: 20 }}>
                        <Base_Text text={itemId ? 'Düzenle' : 'Yeni'} />
                    </View>
                    <View style={{
                        marginBottom: 10
                    }}>
                        <Base_Text bottom={5} text={'Saat Peryodu'} fontWeight={'400'} textAlign={'left'} />
                        <TextInput
                            onSubmitEditing={() => onSubmit()}
                            keyboardType={'number-pad'}
                            value={itemHour2.toString()}
                            placeholder="Saat giriniz"
                            placeholderTextColor="#666666"
                            onChangeText={(val) => setItemHour2(val)}
                            style={{
                                borderColor: "gray",
                                width: "100%",
                                color: '#000',
                                backgroundColor: '#FFF',
                                borderRadius: 5,
                                padding: 10,
                            }}
                        />
                    </View>


                    <View style={{ height: 20 }} />

                    <View style={{ marginBottom: 10 }}>
                        <Button border_Radius={5} bg_color={lightTheme.inputSuccess} width={'100%'} OnClick={() => onSubmit()} height={40} label={"Kaydet"} />
                    </View>

                    <View style={{}}>
                        <Button border_Radius={5} bg_color={lightTheme.inputError} width={'100%'} OnClick={() => {
                            setItemHour2('')
                            setShowModal(!showModal)
                        }} height={40} label={"KAPAT"} />
                    </View>
                </View>



            </Modal >

        </View >
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: lightTheme.minLitegrey
    }
})