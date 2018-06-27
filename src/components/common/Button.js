import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, children}) => {
    const {buttonStyle, textStyle} = styles;

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}> 
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#00008b',
        marginHorizontal: 5
    },
    textStyle: {
        alignSelf: 'center',
        color: '#00008b',
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: 10,
    }
}

export { Button};