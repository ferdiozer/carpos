import { PermissionsAndroid } from "react-native";


export const requestBluetoothPermission = async () => {
  return new Promise((resolve, reject) => {
    return resolve(true)
    // PermissionsAndroid.requestMultiple([
    //   PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
    //   PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
    //   PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    // ]).then(result => {
    //   if (result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED) {
    //     return resolve(true)
    //   } else {
    //     return resolve(false)
    //   }
    // }).catch(err => {
    //   return reject(err)
    // });
  })
}

