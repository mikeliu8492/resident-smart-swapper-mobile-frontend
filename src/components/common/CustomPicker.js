import React, {Component} from 'react';
import {Text, Picker, View} from 'react-native';

const CustomPicker = ({selectedValue, onValueChange}) => {

    const {pickerStyle, labelStyle, containerStyle} = styles;
    return(
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <Picker
                selectedValue={selectedValue}
                style={pickerStyle}
                onValueChange={onValueChange}
            >
                <Picker.Item label="PGY1" value={1} />
                <Picker.Item label="PGY2" value={2} />
                <Picker.Item label="PGY3" value={2} />
            
            </Picker>
        </View>
    )
}

const styles= {
    pickerStyle: {
        color: "#000",
        paddingHorizontal: 5,
        height: 50,
        width: 100,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }

}

export {CustomPicker}