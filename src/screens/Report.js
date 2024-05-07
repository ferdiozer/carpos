import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Buttons/Button'
import lightTheme from '../utils/Theme'
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Base_Text from '../components/Texts/Base_Text'
import { useSelector, useDispatch } from 'react-redux';
import { getExitInCarParking, getInCarParking } from '../DBfunctions/db'
import { useIsFocused } from '@react-navigation/native';
import { onNavigate } from '../navigation/Methods';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
const Page = ({
    navigation
}) => {
    const vehicleTypes = useSelector(state => state?.auth?.vehicleTypes);
    const [dataList, setDataList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0)

    const [dateFrom, setDateFrom] = useState(new Date())
    const [dateTo, setDateTo] = useState(new Date())
    const [openFrom, setOpenFrom] = useState(false)
    const [openTo, setOpenTo] = useState(false)



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

    const getDataList = async (date1, date2) => {
        try {
            if (!date1 || !date2) {
                var startdate = moment();
                startdate = startdate.subtract(7, "days");
                startdate = startdate.format("YYYY-MM-DD");
                date1 = startdate
                setDateFrom(new Date(startdate))
            }
            const inCarParkingList = await getExitInCarParking(date1, date2);
            setDataList(inCarParkingList)
            let priceTo = 0
            for (let index = 0; index < inCarParkingList.length; index++) {
                const element = inCarParkingList[index].price;
                const priceNum = Number(element)
                if (element && !isNaN(priceNum)) {
                    priceTo = priceTo + priceNum
                }
            }
            setTotalPrice(priceTo)
        } catch (error) {
            console.error(error)
        }
    }

    const onClickSelectedDate = (dateField, date) => {
        if (dateField == 'dateFrom') {
            getDataList(moment(date).format("YYYY-MM-DD"), moment(dateTo).format("YYYY-MM-DD"))
        } else {
            getDataList(moment(dateFrom).format("YYYY-MM-DD"), moment(date).format("YYYY-MM-DD"))
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dataList}
                ListHeaderComponent={<View
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setOpenFrom(true)} style={{ backgroundColor: lightTheme.white, padding: 5, borderRadius: 5 }}>
                            <Fontisto style={{ color: lightTheme.black }} name='date' size={26} />
                            <Base_Text textAlign={'right'} fontSize={12} color={lightTheme.black} text={moment(dateFrom).format('DD/MM/YYYY')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setOpenTo(true)} style={{ marginLeft: 5, backgroundColor: lightTheme.white, padding: 5, borderRadius: 5 }}>
                            <Fontisto style={{ color: lightTheme.black }} name='date' size={26} />
                            <Base_Text textAlign={'right'} fontSize={12} color={lightTheme.black} text={moment(dateTo).format('DD/MM/YYYY')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: 5 }}>
                            <View>
                                <Base_Text textAlign={'right'} fontSize={12} color={lightTheme.black} text={`${totalPrice}₺`} />
                                <Base_Text textAlign={'right'} fontSize={10} color={lightTheme.black} text={dataList.length} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => onNavigate(navigation, 'Home')} style={{ backgroundColor: lightTheme.white, padding: 5, borderRadius: 5 }}>
                            <Octicons style={{ color: lightTheme.black }} name='home' size={26} />
                        </TouchableOpacity>
                    </View>
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
                            <View style={{ backgroundColor: lightTheme.lightGrey, justifyContent: 'center', padding: 5, borderRadius: 5 }}>
                                <Base_Text color={lightTheme.black} text={item.plate} />
                            </View>
                            <View style={{}}>
                                <Base_Text fontWeight={'400'} text={getVehicleTypeById(item.vehicleType).name} color={lightTheme.lightBlack} />
                            </View>
                            <View>
                                <Base_Text fontWeight={'400'} text={item.price} color={lightTheme.lightBlack} />
                            </View>
                            <View>
                                <Base_Text fontWeight={'400'} text={moment(item.exitDate).fromNow()} color={lightTheme.lightBlack} />
                            </View>
                        </View>
                    </TouchableOpacity>
                }}
            />
            <DatePicker
                title={'Başlangıç tarihi'}
                cancelText='İptal'
                confirmText='Tamam'
                // mode="datetime"
                mode="date"
                modal
                open={openFrom}
                date={dateFrom}
                onConfirm={(date) => {
                    setOpenFrom(false)
                    setDateFrom(date)
                    onClickSelectedDate('dateFrom', date)
                }}
                onCancel={() => {
                    setOpenFrom(false)
                }}
            />
            <DatePicker
                title={'Bitiş tarihi'}
                cancelText='İptal'
                confirmText='Tamam'
                mode="date"
                modal
                open={openTo}
                date={dateTo}
                onConfirm={(date) => {
                    setOpenTo(false)
                    setDateTo(date)
                    onClickSelectedDate('dateTo', date)
                }}
                onCancel={() => {
                    setOpenTo(false)
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
                            <Base_Text text={'Çıkış zamanı:'} fontWeight={'400'} textAlign={'left'} />
                            <Base_Text left={10} fontSize={24} text={moment(selectedItem?.exitDate).format('DD/MM/YYYY HH:mm')} textAlign={'left'} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Base_Text text={'Araç tipi:'} fontWeight={'400'} textAlign={'left'} />
                            <Base_Text left={10} fontSize={24} text={getVehicleTypeById(selectedItem?.vehicleType).name} textAlign={'left'} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Base_Text text={'Ücret:'} fontWeight={'400'} textAlign={'left'} />
                            <Base_Text left={10} fontSize={24} text={selectedItem?.price} textAlign={'left'} />
                        </View>
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