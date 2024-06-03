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
import { addInCarParking, getInCarParkingByPlate } from '../DBfunctions/db'
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
//printer
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { toLatinFromTurkish } from '../helpers'
import { requestBluetoothPermission } from '../components/permission'

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

  useEffect(() => {
    const checkDrivers = async () => {
      const bluetoothPermission = await requestBluetoothPermission()
      if (bluetoothPermission) {
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
    }
    // checkDrivers()
  }, [])

  useEffect(() => {
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

    try {
      await BluetoothEscposPrinter.printerInit();
      await BluetoothEscposPrinter.printerLeftSpace(0);

      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      await BluetoothEscposPrinter.setBlob(0);

      await BluetoothEscposPrinter.printText(toLatinFromTurkish(user?.companyName), {
        fonttype: 8
      });
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
      await BluetoothEscposPrinter.printText("\n\r", {});
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.RIGHT);
      await BluetoothEscposPrinter.printText(moment(date).format('DD/MM/YYYY HH:mm'), {});
      await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
      await BluetoothEscposPrinter.printText("\n\r", {});
      await BluetoothEscposPrinter.printText(toLatinFromTurkish(plate) + "\n\r", {});
      await BluetoothEscposPrinter.printText("GIRIS------------------------------------", {});
      await BluetoothEscposPrinter.printText("\n\r", {});
      await BluetoothEscposPrinter.printText(settings?.addressLine1, {});
      await BluetoothEscposPrinter.printText("\n\r", {});
      await BluetoothEscposPrinter.printText(settings?.addressLine2, {});
      await BluetoothEscposPrinter.printText("\n\r", {});
      if (settings?.addressLine3) {
        await BluetoothEscposPrinter.printText(settings?.addressLine3, {});
        await BluetoothEscposPrinter.printText("\n\r", {});
      }
      await BluetoothEscposPrinter.printerUnderLine(1);
      await BluetoothEscposPrinter.printText(settings?.phoneNumber + "\n\r", {});
      await BluetoothEscposPrinter.printerUnderLine(0);
      await BluetoothEscposPrinter.printText("\n\r", {});
      await BluetoothEscposPrinter.printQRCode(plate, 180, BluetoothEscposPrinter.ERROR_CORRECTION.L);
      await BluetoothEscposPrinter.printText("\n\r", {});
      await BluetoothEscposPrinter.printText("\n\r", {});
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