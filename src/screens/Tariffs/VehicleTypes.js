import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import Button from '../../components/Buttons/Button'
import lightTheme from '../../utils/Theme'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Base_Text from '../../components/Texts/Base_Text'
import { useSelector, useDispatch } from 'react-redux';
import { addVehicleType, deleteVehicleType, getVehicleTypes, updateVehicleType } from '../../DBfunctions/db'
import { showToast } from '../../helpers/ToastHelper'
import { setVehicleTypesAc } from '../../StateManagment/Redux/Actions/Index'
const Page = ({
    navigation
}) => {
    const dispatch = useDispatch();
    const vehicleTypes = useSelector(state => state?.auth?.vehicleTypes);
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [showModal, setShowModal] = useState(false);


    const setVehicleTypes = async () => {
        try {
            const vehicleTypes = await getVehicleTypes();
            dispatch(setVehicleTypesAc(vehicleTypes))
        } catch (error) {
            console.error(error)
        }
    }
    const onSubmit = async () => {
        if (itemName) {
            try {
                if (itemId) {
                    //update
                    updateVehicleType(itemId, itemName)
                } else {
                    //new
                    addVehicleType(itemName)
                }
                setItemId('')
                setItemName('')
                showToast({ message: 'Başarılı!' })
                setVehicleTypes()
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
            'Silmek istediğinizden emin misiniz?',
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
                data={vehicleTypes}
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
                                <Base_Text fontWeight={'400'} text={`#${item.id}`} color={lightTheme.lightBlack} />
                                <Base_Text left={10} text={item.name} />
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    setItemId(item.id)
                                    setItemName(item.name)
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
                        <TextInput
                            keyboardType={'visible-password'}
                            value={itemName}
                            placeholder="Araç tipi giriniz"
                            placeholderTextColor="#666666"
                            //autoCapitalize="none"
                            onChangeText={(val) => setItemName(val)}
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
                            setItemName('')
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