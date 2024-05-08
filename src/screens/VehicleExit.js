import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Buttons/Button'
import lightTheme from '../utils/Theme'
import { width } from '../utils/Layouts'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { onNavigate } from '../navigation/Methods'
import { useIsFocused } from '@react-navigation/native';
import { showToast } from '../helpers/ToastHelper'
import { addExitInCarParking, deleteInCarParkingById, getInCarParkingByPlate } from '../DBfunctions/db'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
//printer
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { formatedPrice, toLatinFromTurkish } from '../helpers'
import { requestBluetoothPermission } from '../components/permission'

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import LastCarParking from '../components/LastCarParking'
import { pushLastExistInCarParkingAc } from '../StateManagment/Redux/Actions/Index'

const Page = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector(state => state?.auth?.user);
  const settings = useSelector(state => state?.auth?.settings);
  const lastExitInCarParkingList = useSelector(state => state?.auth.lastExitInCarParkingList) || [];
  const vehicleTypes = useSelector(state => state?.auth?.vehicleTypes);
  const [plate, setPlate] = useState('');
  const [showQrScan, setShowQrScan] = useState(false);
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
    checkDrivers()
  }, [])

  useEffect(() => {
    if (isFocused) {
      if (route?.params?.plate) {
        setPlate(route?.params?.plate)
      }
    }
  }, [isFocused]);

  const getVehicleTypeById = (id) => {
    const fI = vehicleTypes.findIndex(v => v.id == id)
    if (fI != -1) {
      return vehicleTypes[fI]
    } else {
      return {}
    }
  }
  const calculatePrice = (vehicleType, dateFrom, dateTo) => {
    const diffHours = moment(dateTo).diff(moment(dateFrom), 'hours', true)
    const huorlyPrice = getVehicleTypeById(vehicleType).huorlyPrice
    let callRes = (Number(diffHours) * Number(huorlyPrice)).toFixed(2);
    return callRes
  }

  const onSubmit = async (thisPlate = plate) => {
    if (!thisPlate) {
      //  showToast({ message: 'Plaka alanı boş olamaz!' })
      return;
    }
    try {
      const inCar = await getInCarParkingByPlate(thisPlate)
      if (!inCar) {
        showToast({ message: 'Araç bulunamadı' })
        return
      }
      const dateNow = new Date().toISOString()
      let price = calculatePrice(inCar.vehicleType, inCar.date, dateNow)
      await addExitInCarParking(inCar.plate, inCar.date, inCar.vehicleType, dateNow, price)
      console.log(
        {
          plate: plate,
          date: inCar.date,
          vehicleType: inCar.vehicleType,
          exitDate: dateNow,
          price: price
        }
      )
      dispatch(pushLastExistInCarParkingAc({
        plate,
        date: inCar.date,
        vehicleType: inCar.vehicleType,
        exitDate: dateNow,
        price
      }))



      await deleteInCarParkingById(inCar.id)
      setPlate('')
      if (Boolean(settings.carOutPrint)) {
        printPoster(plate, dateNow, price)
      }
      showToast({ message: 'Başarılı' })
    } catch (error) {
      console.error(error)
    }
  }

  const printPoster = async (plate, date, price) => {

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
      await BluetoothEscposPrinter.printText("CIKIS------------------------------------", {});
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
      await BluetoothEscposPrinter.printText(formatedPrice(price) + "TL" + "\n\r", {});
      await BluetoothEscposPrinter.printQRCode(plate, 180, BluetoothEscposPrinter.ERROR_CORRECTION.L);
      await BluetoothEscposPrinter.printText("\n\r", {});
      await BluetoothEscposPrinter.printText("\n\r", {});
    } catch (error) {
      console.error(error)
    }
  }


  const onSuccessQr = e => {
    console.log('onSuccessQr', e.data)
    setShowQrScan(false)
    onSubmit(e.data)
  };

  return (
    <View style={styles.container}>

      <View style={{ flex: 0.2 }}>
        {
          showQrScan
          &&
          <View style={{}}>
            <QRCodeScanner
              cameraStyle={{
                width: 100,
                height: 100,
                alignSelf: 'center'
              }}
              onRead={(e) => onSuccessQr(e)}
              flashMode={RNCamera.Constants.FlashMode.torch}
            />
          </View>
        }

      </View>

      <View style={{ flex: 0.8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 10 }}>
          <TouchableOpacity
            onPress={() => setShowQrScan(!showQrScan)}
            style={{
              padding: 10,
              backgroundColor: lightTheme.lightGrey,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderRadius: 10,
              marginRight: 5
            }}>
            <Ionicons style={{ color: lightTheme.black }} name='qr-code' size={28} />
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
            <Button OnClick={() => onSubmit()} border_Radius={10} height={40} label={'Çıkış'} bg_color={lightTheme.themeColor} color={lightTheme.white} />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <LastCarParking dataList={lastExitInCarParkingList} vehicleTypes={vehicleTypes} />
        </View>


      </View>

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