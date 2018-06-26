export default (state=null, action) => {
    console.log("MY PAYLOAD TO REDUX")
    console.log(action)
    switch (action.type){
        case("set_current_logged_user"):
            return action.payload
        default:
            return state;
    }
}