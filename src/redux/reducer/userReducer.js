const INITIAL_STATE = {
    userID: 0,
    email: "",
    role: ""
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                userID: action.payload.id,
                email: action.payload.email,
                role: action.payload.role
            }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}