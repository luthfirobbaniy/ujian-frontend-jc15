const INITIAL_STATE = {
    cartData: [],
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "GET_CART_DATA":
            return {
                cartData: action.payload
            }
        default:
            return state
    }
}