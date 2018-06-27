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

class Inbox extends React.Component{

    state = {
        programName: "",
        specialty: "",
        shiftList: []
    }
    componentWillMount() {
        if(!this.props.userIsPresent) {
            return
        }
        
        const currentLoggedUser = this.props.currentLoggedUser

        //Get the user program too
        axios.get(`https://resident-smart-swapper.herokuapp.com/program/${this.props.currentLoggedUser.program}`)
        .then(response => {
            const program = response.data.program
            this.setState({
                programName: program.institution,
                specialty: program.specialty
            })

            const userPayload = {
                user: currentLoggedUser._id,
                program: currentLoggedUser.program,
                pgy: currentLoggedUser.year,
                target_self: true 
            }

            return axios.post(`https://resident-smart-swapper.herokuapp.com/visualize_shifts`, userPayload)
        })
        .then(response => {
            const shiftList = response.data.calendar_shifts;
            this.setState({
                shiftList: shiftList
            })
        })
        .catch(err => {
            console.log(err.toString())
        })
    }

    renderShiftList() {
        return this.state.shiftList.map(shift => 
        {
            const localStart = new Date(shift.start_shift)
            const localEnd = new Date(shift.end_shift)

            
            let gmtDateTime = moment(shift.start_shift)
            const formatStart = gmtDateTime.local().format('MM/DD/YY h:mm a');

            gmtDateTime = moment(shift.end_shift)
            const formatEnd = gmtDateTime.local().format('MM/DD/YY h:mm a');


            return(
                <CardSection key= {shift._id}>
                    <View style={{flex: 1}}>
                        <Text>Start Shift:  {formatStart}</Text>
                        <Text>End Shift:  {formatEnd}</Text>
                    </View>
                </CardSection>
            )

        }

        )
    }

    render() {
        if(!this.props.userIsPresent) {
            return <Text>You shouldn't be here.</Text>
        }

        const currentLoggedUser = this.props.currentLoggedUser

        return(
            <View style={{flex: 1}}>
                <Text>This is your inbox!!!!</Text>
                <Text>Welcome {currentLoggedUser.first_name} {currentLoggedUser.last_name}</Text>
                <Text>ID:  {currentLoggedUser._id}</Text>
                <Text>PGY:  {currentLoggedUser.year}</Text>
                <Text>Institution:  {this.state.programName}</Text>
                <Text>Specialty:  {this.state.specialty}</Text>
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
        userIsPresent: state.currentLoggedUser !== null
    }
};
  
export default connect(mapStateToProps) (Inbox)
