import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import lightTheme from '../utils/Theme';
import Base_Text from '../components/Texts/Base_Text';
import { onNavigate } from '../navigation/Methods';
import { useSelector, useDispatch } from 'react-redux';
import HomeLogo from '../components/HomeLogo';
import Button from '../components/Buttons/Button';
import { siteInfo } from '../Config/env';

const Page = ({
  navigation
}) => {
  const user = useSelector(state => state?.auth?.user);
  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 20, flex: 1 }}>

      <View style={{ paddingBottom: 20 }}>
        <HomeLogo title={siteInfo.appTitle}/>
      </View>

      <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => onNavigate(navigation, 'VehicleEntrance')}
          style={{
            padding: 10,
            backgroundColor: lightTheme.Accept,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderRadius: 10,
            flex: 1
          }}>
          <View>
            <FontAwesome style={{ color: lightTheme.white }} name='chevron-down' size={120} />
            <Base_Text color={lightTheme.white} text={'Araç Girişi'} fontSize={20} fontWeight={'500'} />
          </View>

        </TouchableOpacity>
        <View style={{ width: 10 }} />

        <TouchableOpacity
          onPress={() => onNavigate(navigation, 'VehicleExit')}
          style={{
            padding: 10,
            backgroundColor: lightTheme.reject,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderRadius: 10,
            flex: 1
          }}>
          <View>
            <FontAwesome style={{ color: lightTheme.white }} name='chevron-up' size={120} />
            <Base_Text color={lightTheme.white} text={'Araç Çıkışı'} fontSize={20} fontWeight={'500'} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 20 }}>
        <Button OnClick={() => onNavigate(navigation, 'CarParking')} label={'Otopark'} bg_color={lightTheme.lightBlack} height={50} border_Radius={10} />
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({})