import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Button from '../../components/Buttons/Button'
import lightTheme from '../../utils/Theme'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Base_Text from '../../components/Texts/Base_Text'
import ActionSheet from 'react-native-actionsheet'
import { useSelector, useDispatch } from 'react-redux';
import { addVehicleType, deleteVehicleType, getVehicleTypes, updateVehicleType, getTariff, updateTariff, addTariff } from '../../DBfunctions/db'
import { showToast } from '../../helpers/ToastHelper'
import { setTariffsAc, setVehicleTypesAc } from '../../StateManagment/Redux/Actions/Index'
const Page = ({
    navigation
}) => {
    const dispatch = useDispatch();
    const vehicleTypes = useSelector(state => state?.auth?.vehicleTypes);
    const vehicleHours = useSelector(state => state?.auth?.vehicleHours);
    const vehicleTariffs = useSelector(state => state?.auth?.tariffList);
    const [selectedVehicleTypeIndex, setSelectedVehicleTypeIndex] = useState(0);
    const [selectedVehicleHourIndex, setSelectedVehicleHourIndex] = useState(0);
    const [itemId, setItemId] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [showModal, setShowModal] = useState(false);

    const refActionSheetHours = useRef(null)
    const refActionSheetVehicleTypes = useRef(null)

console.log("vehicleTariffs",vehicleTariffs)

    const getLocalTariffs = async () => {
        try {
            const items = await getTariff();
            dispatch(setTariffsAc(items))
        } catch (error) {
            console.error(error)
        }
    }

    const setVehicleTypes = async () => {
        try {
            const vehicleTypes = await getVehicleTypes();
            dispatch(setVehicleTypesAc(vehicleTypes))
        } catch (error) {
            console.error(error)
        }
    }
    const onSubmit = async () => {
        if (!isNaN(Number(itemPrice))) {
            try {
                if (itemId) {
                    //update
                    await updateTariff(itemId, vehicleTypes[selectedVehicleTypeIndex].id, vehicleHours[selectedVehicleHourIndex].id, Number(itemPrice))
                } else {
                    //new
                    await addTariff(vehicleTypes[selectedVehicleTypeIndex].id, vehicleHours[selectedVehicleHourIndex].id, Number(itemPrice))

                }
                setItemId('')
                setItemPrice('')
                showToast({ message: 'Başarılı!' })
                getLocalTariffs()
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
            `${item.name} araç tipini silmek istediğinizden emin misiniz?`,
            [
                {
                    text: 'Hayır',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Evet', onPress: async () => {
                        await deleteVehicleType(item.id)
                        setVehicleTypes()
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
                data={vehicleTariffs}
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingRight: 20 }}>
                                <View>
                                    <Base_Text text={item.vehicleTypeName} />
                                </View>
                                <View>
                                    <Base_Text fontWeight={'400'} text={item.hour2} color={lightTheme.lightBlack} />
                                </View>
                                <View>
                                    <Base_Text fontWeight={'400'} text={item.price} color={lightTheme.lightBlack} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', }}>
                                <TouchableOpacity onPress={() => {
                                    setItemId(item.id)
                                    setItemPrice(item.price)
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
                        <Base_Text bottom={5} text={'Araç tipi'} fontWeight={'400'} textAlign={'left'} />
                        <TouchableOpacity
                            onPress={() => refActionSheetVehicleTypes.current?.show()}
                            style={{
                                borderColor: "gray",
                                width: "100%",
                                color: '#000',
                                backgroundColor: '#FFF',
                                borderRadius: 5,
                                padding: 10,
                            }}
                        >
                            <Base_Text text={vehicleTypes[selectedVehicleTypeIndex]?.name} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        marginBottom: 10
                    }}>
                        <Base_Text bottom={5} text={'Saat baremi'} fontWeight={'400'} textAlign={'left'} />
                        <TouchableOpacity
                            onPress={() => refActionSheetHours.current?.show()}
                            style={{
                                borderColor: "gray",
                                width: "100%",
                                color: '#000',
                                backgroundColor: '#FFF',
                                borderRadius: 5,
                                padding: 10,
                            }}
                        >
                            <Base_Text text={vehicleHours[selectedVehicleHourIndex]?.hour2} />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        marginBottom: 10
                    }}>
                        <Base_Text bottom={5} text={'Fiyat'} fontWeight={'400'} textAlign={'left'} />
                        <TextInput
                            onSubmitEditing={() => onSubmit()}
                            keyboardType={'number-pad'}
                            value={itemPrice.toString()}
                            placeholder="Fiyat giriniz"
                            placeholderTextColor="#666666"
                            onChangeText={(val) => setItemPrice(val)}
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
                        <Button border_Radius={5} bg_color={lightTheme.inputError} width={'100%'} OnClick={() => setShowModal(!showModal)} height={40} label={"KAPAT"} />
                    </View>
                </View>



            </Modal >

            <ActionSheet
                ref={refActionSheetVehicleTypes}
                title={'Araç tipi seçin'}
                options={vehicleTypes.map(v => v.name.toString()).concat(['Kapat'])}
                cancelButtonIndex={vehicleTypes.length}
                destructiveButtonIndex={vehicleTypes.length}
                onPress={(index) => {
                    if (vehicleTypes.length != index) {
                        setSelectedVehicleTypeIndex(index)
                    }
                }}
            />

            <ActionSheet
                ref={refActionSheetHours}
                title={'Saat baremi seçin'}
                options={vehicleHours.map(v => v.hour2.toString()).concat(['Kapat'])}
                cancelButtonIndex={vehicleHours.length}
                destructiveButtonIndex={vehicleHours.length}
                onPress={(index) => {
                    if (vehicleHours.length != index) {
                        setSelectedVehicleHourIndex(index)
                    }
                }}
            />


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