import React, {Component} from "react";

const UserContext = React.createContext({
    currentUser: null
}); //passing initial value



export const UserConsumer = UserContext.Consumer;
export class UserProvider extends Component{
    state = {
        currentUser: null
    }
    
    changeUserState = (currentUser) => {
        this.setState({currentUser: currentUser})
    }

    render() {
        return(
            <UserContext.Provider
                value={{
                    currentUser: this.state.currentUser
                }}
            >
                {this.props.children}
            </UserContext.Provider>
        ) 
    }
}