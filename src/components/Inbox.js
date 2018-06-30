import React from 'react';
import {Text, View, FlatList} from 'react-native';

// Redux Services
import {connect} from 'react-redux';

//Axios Services
import axios from 'axios';
import { CardSection } from './common';

//Formatting Services
import moment from 'moment-timezone'
import {Actions} from 'react-native-router-flux'

//Swap Details
import SwapOverview from './SwapOverview'

const baseUrl = "https://resident-smart-swapper.herokuapp.com/"

class Inbox extends React.Component{

    state = {
        programName: "",
        specialty: "",
        requestList: []
    }

    componentWillMount() {
        const currentLoggedUser = this.props.currentLoggedUser.userInfo

        axios.get(`https://resident-smart-swapper.herokuapp.com/swap_request/by_user/${currentLoggedUser._id}?origin=0`)
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

    populateElementsOfChild (request) {
        return new Promise((resolve, reject) => {
            const formattedCreateTime = request.create_time
        
            tempFromShift = {}
            tempToShift = {}
            tempFromUser = {}
            requestData = {}
            
            axios.get(`${baseUrl}swap_request/${request._id}`)
            .then(response => {
                requestData = response.data.swap_request
                const fromShiftByIdUrl = `${baseUrl}shift/${requestData.from_shift}`

                return axios.get(fromShiftByIdUrl)
            })
            
            .then(response => {
                tempFromShift = response.data.shift
                const toShiftByIdUrl = `${baseUrl}shift/${requestData.to_shift}`
                return axios.get(toShiftByIdUrl)
            })
            .then(response => {
                tempToShift = response.data.shift

                const fromUserUrl = `${baseUrl}user/${tempFromShift.user}`
                return axios.get(fromUserUrl)
            })
            .then(response => {
                tempFromUser = response.data.user
                const toUserUrl = `${baseUrl}user/${tempToShift.user}`
                return axios.get(toUserUrl)
            })
            .then(response => {
                resolve({
                    toUserData: response.data.user,
                    fromUserData: tempFromUser,
                    toShiftData: tempToShift,
                    fromShiftData: tempFromShift,
                    createTime: formattedCreateTime
                })
            })
            .catch(error => {
                console.log(error.toString())
                reject({
                    toUserData: "",
                    fromUserData: "",
                    toShiftData: "",
                    fromShiftData: "",
                    createTime: ""
                })
            })
        })
    }

    renderShiftList() {
        
        if(this.state.requestList.length === 0) {
            return(
                <CardSection>
                    <View style={{flex: 1}}>
                        <Text>You have no reqeusts in this box</Text>
                    </View>
                </CardSection>
            )
        }
        console.log("THESE ARE MY THINGS!!")
        console.log(this.state.requestList)
        
        /*
        return this.state.requestList.map((request) => {
            return <SwapOverview key={request._id} request={request}/>
        })
        */

        return<FlatList 
                data={this.state.requestList}
                keyExtractor = {(item) => item._id} 
                renderItem={this.renderItem}
                ></FlatList>


    }
    
    timeFormatHelper(timeString) {
        //console.log("TIMESTRING BEFORE CONVERSION:  " + timeString)
        let gmtDateTime = moment(timeString)
        return  gmtDateTime.tz("America/New_York").format('MM/DD/YY h:mm a')
    }

    renderItem({item, index}) {
        return <SwapOverview request={item}/>
        
    }



    render() {
        const currentLoggedUser = this.props.currentLoggedUser.userInfo

        return(
            <View style={{flex: 1}}>
                <Text>This is your inbox!!!!</Text>
                <Text>Welcome {currentLoggedUser.first_name} {currentLoggedUser.last_name}</Text>
                    {this.renderShiftList()}
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
  
export default connect(mapStateToProps) (Inbox)
