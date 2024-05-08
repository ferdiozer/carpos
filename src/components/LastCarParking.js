
import React from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import lightTheme from '../utils/Theme';
import Base_Text from './Texts/Base_Text';
import moment from 'moment';

export default ({
    vehicleTypes,
    dataList
}) => {

    const getVehicleTypeById = (id) => {
        const fI = vehicleTypes.findIndex(v => v.id == id)
        if (fI != -1) {
            return vehicleTypes[fI]
        } else {
            return {}
        }
    }

    return (
        <FlatList
            data={dataList}
            contentContainerStyle={{ paddingTop: 20, justifyContent: 'center' }}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            renderItem={({ item }) => {
                return <View key={item.id}
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
                        {/* <View style={{}}>
                        <Base_Text fontWeight={'400'} text={getVehicleTypeById(item.vehicleType).name} color={lightTheme.lightBlack} />
                    </View> */}
                        <View>
                            <Base_Text fontWeight={'400'} text={item.price} color={lightTheme.lightBlack} />
                        </View>
                        <View>
                            <Base_Text fontWeight={'400'} text={moment(item.exitDate).fromNow()} color={lightTheme.lightBlack} />
                        </View>
                    </View>
                </View>
            }}
        />
    )
}





