import React, {Component} from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'

import { Header, Card, CardSection, Button, Confirm} from './common';


import moment from 'moment'
import axios from 'axios'

import {Actions} from 'react-native-router-flux'

const baseUrl = "https://resident-smart-swapper.herokuapp.com/"
class SwapDetails extends Component{
    
    state = {
        myColor: "white",
        expanded: false,
        confirmActive: false,
        formattedTime: "",
        fromUserData: {},
        toUserData: {},
        fromShiftData: {},
        toShiftData: {}
    }

    // TODO:  Place the swap api call here
    makeSwap() {
        console.log("INITIALIZE SWAP FOR:  " + this.props.request._id)
        
        const requestId = this.props.request._id
        const swapUrl = `${baseUrl}switch_shifts/${requestId}`
        /*
        console.log("My swap URL:  " + swapUrl)
        console.log("SWAP COMPLETED!")
        this.setState({confirmActive: false})
        Actions.pop()
        */
        
        axios.post(swapUrl, {})
        .then(() => {
            console.log("SWAP COMPLETED!")
            this.setState({confirmActive: false})
            Actions.pop()
        })
        .catch(err => {
            console.log(err.toString())
            this.setState({confirmActive: false})
            Actions.pop()
        })
        


    }

    renderConfirmModal() {
        if(this.state.confirmActive) {
            // TODO:  Perform time functionality here
            const ownOriginalStart = this.timeFormatHelper(this.state.toShiftData.start_shift)
            const ownOriginalEnd = this.timeFormatHelper(this.state.toShiftData.end_shift)

            const newShiftStart = this.timeFormatHelper(this.state.fromShiftData.start_shift)
            const newShiftEnd = this.timeFormatHelper(this.state.fromShiftData.end_shift)

            return(
                <Confirm 
                    onAccept={this.makeSwap.bind(this)}
                    onDecline={() => this.setState({confirmActive: false})}    
                >
                    <View>
                        <Text>Confirm swap for this current request?</Text>
                        <Text> ID:  {this.props.request._id}</Text>
                        <Text>Your Original Shift</Text>
                        <Text>{ownOriginalStart} to {ownOriginalEnd} @ Location</Text>
                        <Text> </Text>
                        <Text>YOUR NEW SHIFT</Text>
                        <Text>{newShiftStart} to {newShiftEnd} @ Location</Text>
                    </View>
                </Confirm>
            )
        }
    }

    activateModal() {
        this.setState({confirmActive: true})
    }


    componentWillMount() {
        console.log("COMPONENT WILL MOUNT")
        console.log("OTHER PASSED PROPS:  ")
        console.log(this.props.otherPassed)
        
        const request = this.props.request;

        const formattedCreateTime = this.timeFormatHelper(request.create_time)
        this.setState({formattedTime: formattedCreateTime})

        const fromShiftByIdUrl = `${baseUrl}shift/${request.from_shift}`
        const toShiftByIdUrl = `${baseUrl}shift/${request.to_shift}`
        
        tempFromShift = {}
        tempToShift = {}
        tempFromUser = {}
        requestData = {}
        
        axios.get(`${baseUrl}swap_request/${request._id}`)
        .then(response => {
            requestData = response.data.swap_request
            console.log("REQUEST DATA CALL WITHIN")
            console.log(requestData)

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
            this.setState({
                toUserData: response.data.user,
                fromUserData: tempFromUser,
                toShiftData: tempToShift,
                fromShiftData: tempFromShift
            })

            console.log("FINAL STATE FOR CURRENT OBJECT:  " + request._id)
            console.log(this.state)
        })
        .catch(error => {
            console.log(error.toString())
            Actions.pop()
        })
    }


    componentWillUpdate() {
        console.log("COMPONENT WILL UDATE")
        console.log("OTHER PASSED PROPS:  ")
        console.log(this.props.otherPassed)
        
        const request = this.props.request;

        const formattedCreateTime = this.timeFormatHelper(request.create_time)
        this.setState({formattedTime: formattedCreateTime})

        const fromShiftByIdUrl = `${baseUrl}shift/${request.from_shift}`
        const toShiftByIdUrl = `${baseUrl}shift/${request.to_shift}`
        
        tempFromShift = {}
        tempToShift = {}
        tempFromUser = {}
        requestData = {}
        
        axios.get(`${baseUrl}swap_request/${request._id}`)
        .then(response => {
            requestData = response.data.swap_request
            console.log("REQUEST DATA CALL WITHIN")
            console.log(requestData)

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
            this.setState({
                toUserData: response.data.user,
                fromUserData: tempFromUser,
                toShiftData: tempToShift,
                fromShiftData: tempFromShift
            })

            console.log("FINAL STATE FOR CURRENT OBJECT:  " + request._id)
            console.log(this.state)
        })
        .catch(error => {
            console.log(error.toString())
            Actions.pop()
        })
    }



    timeFormatHelper(timeString) {
        //console.log("TIMESTRING BEFORE CONVERSION:  " + timeString)
        let gmtDateTime = moment(timeString)
        return  gmtDateTime.tz("America/New_York").format('MM/DD/YY h:mm a')
    }

    render() {
        const {request} = this.props;
        /*
        console.log("FROM SHIFT")
        console.log(this.state.fromShiftData)
        console.log("TO SHIFT")
        console.log(this.state.toShiftData)
        */

       const ownOriginalStart = this.timeFormatHelper(this.state.toShiftData.start_shift)
       const ownOriginalEnd = this.timeFormatHelper(this.state.toShiftData.end_shift)

       const newShiftStart = this.timeFormatHelper(this.state.fromShiftData.start_shift)
       const newShiftEnd = this.timeFormatHelper(this.state.fromShiftData.end_shift)

        return(
            <TouchableOpacity onPress={this.activateModal.bind(this)}>
                 <Card>
                    <CardSection style={{justifyContent: 'center'}}>
                        <Text>Shift to Swap @ {this.state.formattedTime}</Text>
                    </CardSection>

                    <CardSection>
                        <View>
                            <Text>{this.state.fromUserData.first_name} {this.state.fromUserData.last_name} (PGY{this.state.fromUserData.year}) would like to swap!</Text>
                            <Text>Click for details!</Text>
                            <Text>Your Original Shift</Text>
                            <Text>{ownOriginalStart} to {ownOriginalEnd} @ Location</Text>
                            <Text> </Text>
                            <Text>YOUR NEW SHIFT</Text>
                            <Text>{newShiftStart} to {newShiftEnd} @ Location</Text>
                        </View>                   
                        {this.renderConfirmModal()}
                    </CardSection>
                </Card>
               
            </TouchableOpacity>
        )
    }
}

export default SwapDetails


/*
                <CardSection>
                    <View style={{flex: 1}}>
                        <Text>{request._id}</Text>
                        <Text>{request.from_shift}</Text>
                        <Text>{request.to_shift}</Text>
                        <Text>{request.create_time.toString()}</Text>
                        <Text>{request.reason}</Text>
                        <Text>{ownOriginalStart} + {ownOriginalEnd}</Text>
                    </View>

                </CardSection>
 */