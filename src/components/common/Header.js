// Import libraries
import React from 'react';
import {Text, View} from 'react-native';

const Header = (props) => {
    const {textStyle, viewStyle} = styles;

    return(
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    )
}

const styles = {
    textStyle: {
        fontSize: 20
    },
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        paddingTop: 5,
        paddingBottom: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        elevation: 2,
        position: 'relative',
    }
}

export {Header};