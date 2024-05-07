import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Buttons/Button'
import lightTheme from '../utils/Theme'
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Base_Text from '../components/Texts/Base_Text'
import { useSelector, useDispatch } from 'react-redux';
import { getInCarParking } from '../DBfunctions/db'
import { useIsFocused } from '@react-navigation/native';
import { onNavigate } from '../navigation/Methods';
import moment from 'moment';
const Page = ({
    navigation
}) => {
    const vehicleTypes = useSelector(state => state?.auth?.vehicleTypes);
    const [dataList, setDataList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getDataList()
        }
    }, [isFocused])

    const getVehicleTypeById = (id) => {
        const fI = vehicleTypes.findIndex(v => v.id == id)
        if (fI != -1) {
            return vehicleTypes[fI]
        } else {
            return {}
        }
    }

    const getDataList = async () => {
        try {
            const inCarParkingList = await getInCarParking();
            setDataList(inCarParkingList)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dataList}
                ListHeaderComponent={<View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 5, flexDirection: 'row' }}>
                        {/* <Fontisto name='car' size={25} color={lightTheme.black}  /> */}
                        <Base_Text color={lightTheme.black} text={dataList.length} />
                    </View>
                    <TouchableOpacity onPress={() => onNavigate(navigation, 'Home')} style={{ backgroundColor: lightTheme.white, padding: 5, borderRadius: 5 }}>
                        <Octicons style={{ color: lightTheme.black }} name='home' size={26} />
                    </TouchableOpacity>
                </View>}
                ListHeaderComponentStyle={{
                    paddingBottom: 5
                }}
                contentContainerStyle={{ paddingTop: 20, justifyContent: 'center' }}
                ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                renderItem={({ item }) => {
                    return <TouchableOpacity key={item.id}
                        onPress={() => {
                            setSelectedItem(item)
                            setShowModal(true)
                        }}
                        style={{
                            backgroundColor: lightTheme.input_BG_color,
                            padding: 10,
                            borderRadius: 5
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Base_Text fontWeight={'400'} text={`#${item.id}`} color={lightTheme.lightBlack} />
                                <View style={{ backgroundColor: lightTheme.lightGrey, justifyContent: 'center', padding: 5, borderRadius: 5, marginLeft: 10 }}>
                                    <Base_Text color={lightTheme.black} text={item.plate} />
                                </View>
                            </View>
                            <View style={{}}>
                                <Base_Text fontWeight={'400'} text={getVehicleTypeById(item.vehicleType).name} color={lightTheme.lightBlack} />
                            </View>
                            <Base_Text fontWeight={'400'} text={moment(item.date).fromNow()} color={lightTheme.lightBlack} />
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => onNavigate(navigation, 'VehicleExit', { plate: item.plate })}
                                    style={{
                                        padding: 10,
                                        backgroundColor: lightTheme.reject,
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        borderRadius: 10,
                                    }}>
                                    <FontAwesome style={{ color: lightTheme.white }} name='chevron-up' size={22} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
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
                        <Base_Text text={'Park detay'} />
                    </View>

                    <View style={{
                        marginBottom: 10,
                        padding: 20,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Base_Text text={'Plaka:'} fontWeight={'400'} textAlign={'left'} />
                            <Base_Text left={10} fontSize={24} text={selectedItem?.plate} textAlign={'left'} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Base_Text text={'Giriş zamanı:'} fontWeight={'400'} textAlign={'left'} />
                            <Base_Text left={10} fontSize={24} text={moment(selectedItem?.date).format('DD/MM/YYYY HH:mm')} textAlign={'left'} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Base_Text text={'Araç tipi:'} fontWeight={'400'} textAlign={'left'} />
                            <Base_Text left={10} fontSize={24} text={getVehicleTypeById(selectedItem?.vehicleType).name} textAlign={'left'} />
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                            setShowModal(false)
                            onNavigate(navigation, 'VehicleExit', { plate: selectedItem?.plate })
                        }}
                            style={{
                                padding: 10,
                                backgroundColor: lightTheme.reject,
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                borderRadius: 10,
                            }}>
                            <FontAwesome style={{ color: lightTheme.white }} name='chevron-up' size={22} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 20 }} />
                    <View style={{}}>
                        <Button border_Radius={5} bg_color={lightTheme.inputError} width={'100%'} OnClick={() => setShowModal(!showModal)} height={40} label={"KAPAT"} />
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