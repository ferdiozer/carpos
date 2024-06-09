import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Button from '../components/Buttons/Button'
import ActionSheet from 'react-native-actionsheet'
import lightTheme from '../utils/Theme'
import Base_Text from '../components/Texts/Base_Text'
import Octicons from 'react-native-vector-icons/Octicons';
import { onNavigate } from '../navigation/Methods'
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedVehicleTypeIndexAc } from '../StateManagment/Redux/Actions/Index'
import { showToast } from '../helpers/ToastHelper'
import { addInCarParking, getInCarParkingByPlate, getSettings } from '../DBfunctions/db'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
//printer
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { toLatinFromTurkish } from '../helpers'

const Page = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector(state => state?.auth?.user);
  const settings = useSelector(state => state?.auth?.settings);
  const vehicleTypes = useSelector(state => state?.auth?.vehicleTypes);
  const selectedVehicleTypeIndex = useSelector(state => state?.auth?.selectedVehicleTypeIndex) || 0;

  const [plate, setPlate] = useState('');
  const [carInPrint, setCarInPrint] = useState(0);

  useEffect(() => {
    const checkDrivers = async () => {
      try {
        const isEnabled = await BluetoothManager.checkBluetoothEnabled();
        if (isEnabled) {
          const devices = await BluetoothManager.enableBluetooth();
          await BluetoothManager.connect(JSON.parse(devices).address);
        } else {
          Alert.alert("Uyarı", "Fiş yazdırmak için Bluetooth açık olmalı!")
        }
      } catch (error) {
        console.error(error)
      }
    }
    checkDrivers()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let settingsDb = await getSettings();
        setCarInPrint(settingsDb.carInPrint)
      } catch (error) {
        console.error(error)
      }
    }
    if (isFocused) {
      if (vehicleTypes.length == 0) {
        Alert.alert("Uyarı", "Öncelikle araç tipi ekleyin!", [
          {
            text: 'Daha sonra',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Tamam Şimdi Ekle', onPress: () => {
              onNavigate(navigation, 'Tariffs')
            },
          },
        ],
          { cancelable: false },)
      }
      fetchData()
    }
  }, [isFocused]);

  const onSubmit = async () => {
    if (!plate) {
      // showToast({ message: 'Geçersiz giriş' })
      return
    }
    const dateNow = new Date().toISOString()
    const selectedVehicleTypeID = vehicleTypes[selectedVehicleTypeIndex]?.id || 1
    try {
      const inCar = await getInCarParkingByPlate(plate)
      if (inCar) {
        showToast({ message: 'Araç zaten içeride' })
        return
      }
      await addInCarParking(plate, dateNow, selectedVehicleTypeID)
      showToast({ message: 'Başarılı' })
      setPlate('')
      if (Boolean(settings.carInPrint)) {
        printPoster(plate, dateNow)
      }
    } catch (error) {
      console.error(error)
    }

  }

  const printPoster = async (plate, date) => {
    const options = {
      width: 40,
      height: 30,
      sound: 0,
      text: [
        {
          text: toLatinFromTurkish(user?.companyName),
          x: 0,
          y: 0,
          fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
          yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        },
        {
          text: settings?.addressLine1,
          x: 0,
          y: 0,
          fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
          yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        },
        {
          text: settings?.addressLine2,
          x: 0,
          y: 0,
          fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
          yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        },
        {
          text: settings?.addressLine3,
          x: 0,
          y: 0,
          fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
          yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        },
        {
          text: settings?.phoneNumber,
          x: 0,
          y: 0,
          fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
          yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
        }
      ],
      qrcode: [
        {
          x: 0,
          y: 0,
          level: BluetoothTscPrinter.EEC.LEVEL_L,
          width: 3,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          code: plate,
        },
      ],
      barcode: [
        {
          x: 0,
          y: 0,
          type: BluetoothTscPrinter.BARCODETYPE.CODE128,
          height: 40,
          readable: 1,
          rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
          code: plate,
        },
      ]
    };
    try {
    //   await BluetoothTscPrinter.printLabel(options);

    const printText = `
    ${toLatinFromTurkish(user?.companyName)}
    \n\r
    \n\r
    asdfsd gs d 235234
    346543634634\n\r
    1234567890
    `

    await BluetoothEscposPrinter.printText(toLatinFromTurkish(printText), {});

      // let columnWidths = [12, 6, 6, 8];
      // await BluetoothEscposPrinter.printColumn(columnWidths,
      //   [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
      //   ["Kurkcubasi Otopark"], {});


      // await BluetoothEscposPrinter.printText(toLatinFromTurkish(user?.companyName), {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText(moment(date).format('DD/MM/YYYY HH:mm') + "\n\r", {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText("-----------------------------------------------------------------------------------------------------------", {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText(settings?.addressLine1, {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText(settings?.addressLine2, {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText(settings?.addressLine3 + "\n\r", {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText(settings?.phoneNumber + "\n\r", {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.printText("\n\r", {});
      // await BluetoothEscposPrinter.cutOnePoint();
    } catch (error) {
      console.error(error)
    }
  }

  const refActionSheet = useRef(null)

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}></View>
      <View style={{ flex: 0.8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10 }}>
          <TouchableOpacity
            onPress={() => refActionSheet.current?.show()}
            style={{
              padding: 10,
              backgroundColor: lightTheme.lightGrey,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderRadius: 10,
              marginRight: 5
            }}>
            <Base_Text
              text={vehicleTypes[selectedVehicleTypeIndex]?.name}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNavigate(navigation, 'Home')}
            style={{
              padding: 10,
              backgroundColor: lightTheme.lightGrey,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderRadius: 10,
            }}>
            <Octicons style={{ color: lightTheme.black }} name='home' size={20} />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              autoFocus={true}
              onSubmitEditing={() => onSubmit()}
              keyboardType={'visible-password'}
              value={plate}
              placeholder="Araç Plakası"
              placeholderTextColor="#666666"
              autoCapitalize={'characters'}
              autoComplete={'off'}
              autoCorrect={false}
              //autoCapitalize="none"
              onChangeText={(val) => setPlate(val)}
              style={{
                borderColor: "gray",
                width: "100%",
                color: '#000',
                backgroundColor: '#FFF',
                borderWidth: 1,
                borderBottomWidth: 1,
                borderRadius: 10,
                padding: 10,
              }}
            />
          </View>
          <View>
            <Button OnClick={() => onSubmit()} border_Radius={10} height={40} label={'Giriş'} bg_color={lightTheme.themeColor} color={lightTheme.white} />
          </View>
        </View>
      </View>

      <ActionSheet
        ref={refActionSheet}
        title={'Araç tipi'}
        options={vehicleTypes.map(v => v.name.toString()).concat(['Kapat'])}
        cancelButtonIndex={vehicleTypes.length}
        destructiveButtonIndex={vehicleTypes.length}
        onPress={(index) => {
          if (vehicleTypes.length != index) {
            dispatch(setSelectedVehicleTypeIndexAc(index))
          }
        }}
      />

    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  }
})