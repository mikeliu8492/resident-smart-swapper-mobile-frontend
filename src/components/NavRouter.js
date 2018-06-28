import React from 'react';
// Form Imports
import Home from '../components/Home'
import RegistrationForm from '../components/RegistrationForm';
import Calendar from '../components/Calendar';
import LoginForm from '../components/LoginForm';
import TaylorSwift from '../components/TaylorSwift';
import PasswordResetForm from '../components/PasswordResetForm';
import UserSettings from '../components/UserSettings';
import Inbox from '../components/Inbox';
import Outbox from '../components/Outbox';
import EligibleShifts from '../components/EligibleShifts'
import ConfirmRequestSent from '../components/ConfirmRequestSent'


import {Router, Scene} from 'react-native-router-flux';

const NavRouter = () => {
    return(
        <Router>
            <Scene key="root" style={{paddingTop: 65}} hideNavBar>
                <Scene key="auth">
                    <Scene key="Login" component={LoginForm} title="Please Sign In" initial></Scene>
                    <Scene key="Register" component={RegistrationForm} title="Please Register"></Scene>
                    <Scene key="ResetPassword" component={PasswordResetForm} title="Reset Password"></Scene>
                </Scene>
                <Scene key="main">
                    <Scene key="Home" component={Home} title="Main Menu" initial></Scene>
                    <Scene key="Inbox" component={Inbox} title="Request Inbox" ></Scene>
                    <Scene key="Outbox" component={Outbox} title="Outgoing Requests" ></Scene>
                    <Scene key="UserSettings" component={UserSettings} title="User Settings" ></Scene>
                    <Scene key="ConfirmRequestSent" component={ConfirmRequestSent} title="Confirm Request Sent" ></Scene>
                </Scene>
                <Scene key="calendar">
                    <Scene key="Calendar" component={Calendar} title="My Calendar" targetSelf={true} initial></Scene>
                    <Scene key="EligibleShifts" component={EligibleShifts} title="Eligible Shifts To Swap" ></Scene>
                </Scene>

            </Scene>
        </Router>
    )
}


export default NavRouter