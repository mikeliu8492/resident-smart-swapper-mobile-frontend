import React, {Component} from 'react';
import { Text, View } from 'react-native';

import {Button, Card, CardSection, Header} from './common'

import {Actions} from 'react-native-router-flux'

class ConfirmShiftSwap extends Component {

    goHome() {
        Actions.main()
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <View alignItems="center">
                        <Text>Good!  Your request has been sent.</Text>
                    </View>
                    
                </CardSection>
                <CardSection>
                    <Button onPress={this.goHome.bind(this)}>
                        Back to Home
                    </Button>
                </CardSection>
            </Card>
        )
    }
}
export default ConfirmShiftSwap