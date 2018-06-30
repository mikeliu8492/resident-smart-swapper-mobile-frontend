import React from 'react';
import {Text, View} from 'react-native';

// Redux Services
import {connect} from 'react-redux';

//Axios Services
import axios from 'axios';
import { CardSection } from './common';

//Formatting Services
import moment from 'moment-timezone'
import {Actions} from 'react-native-router-flux'

class Outbox extends React.Component{

    state = {
        programName: "",
        specialty: "",
        requestList: []
    }
    componentWillMount() {
        const currentLoggedUser = this.props.currentLoggedUser.userInfo

        axios.get(`https://resident-smart-swapper.herokuapp.com/swap_request/by_user/${currentLoggedUser._id}?origin=1`)
        .then(response => {
            const requestList = response.data.swap_requests;
            this.setState({
                requestList: requestList
            })
        })
        .catch(err => {
            console.log(err.toString())
        })
    }

    renderShiftList() {
        
        if(this.state.requestList.length === 0) {
            return(
                <CardSection>
                    <View style={{flex: 1}}>
                        <Text>You have no requests in this box</Text>
                    </View>
                </CardSection>
            )
        }

        return this.state.requestList.map(request => 
        {
            return(
                <CardSection key= {request._id}>
                    <View style={{flex: 1}}>
                        <Text>From Shift:  {request.from_shift}</Text>
                        <Text>To Shift:  {request.to_shift}</Text>
                    </View>
                </CardSection>
            )

        }

        )
    }

    render() {
        const currentLoggedUser = this.props.currentLoggedUser.userInfo

        return(
            <View style={{flex: 1}}>
                <Text>This is your inbox!!!!</Text>
                <Text>Welcome {currentLoggedUser.first_name} {currentLoggedUser.last_name}</Text>
                <View>
                    {this.renderShiftList()}
                </View>
            </View>
        )

    }
}

// Redux boilerplate!
const mapStateToProps = (state, ownProps) => {
    return {
        currentLoggedUser: state.currentLoggedUser,
    }
};
  
export default connect(mapStateToProps) (Outbox)
