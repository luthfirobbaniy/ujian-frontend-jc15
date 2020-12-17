import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { historyReducer } from './historyReducer'
import { productReducer } from './productReducer'
import {userReducer} from './userReducer'

export default combineReducers ({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    history: historyReducer
})