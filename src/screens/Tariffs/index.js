import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import lightTheme from '../../utils/Theme'
import Base_Text from '../../components/Texts/Base_Text'
import Tariffs_Recipe from './Tariffs_Recipe'
import VehicleTypes from './VehicleTypes'
import Hours from './Hours'
const Page = ({
    navigation
}) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => setSelectedTabIndex(0)} style={[styles.headerTouchableOpacity, { backgroundColor: selectedTabIndex == 0 ? lightTheme.themeColor : lightTheme.lightBlack }]}>
                    <Base_Text color={lightTheme.white} text={"Tarife/Saat"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTabIndex(1)} style={[styles.headerTouchableOpacity, { backgroundColor: selectedTabIndex == 1 ? lightTheme.themeColor : lightTheme.lightBlack }]}>
                    <Base_Text color={lightTheme.white} text={"Araç tipleri"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedTabIndex(2)} style={[styles.headerTouchableOpacity, { backgroundColor: selectedTabIndex == 2 ? lightTheme.themeColor : lightTheme.lightBlack }]}>
                    <Base_Text color={lightTheme.white} text={"Saatler"} />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {selectedTabIndex == 0 && <Tariffs_Recipe setSelectedTabIndex={setSelectedTabIndex} />}
                {selectedTabIndex == 1 && <VehicleTypes />}
                {selectedTabIndex == 2 && <Hours />}
            </View>
        </View >
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTouchableOpacity: {
        flex: 1,
        padding: 10
    },
    headerText: {
        color: lightTheme.white
    }
})