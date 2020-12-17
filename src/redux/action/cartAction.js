import Axios from "axios"
import { api_url } from "../../helpers/api_url"
import swal from "sweetalert"

export const addToCart = (cartData, userID) => {
    return (dispatch) =>{
        Axios.post(`${api_url}/cart`, cartData)
            .then((res) => {
                dispatch({
                    type: "ADD_TO_CART",
                })
                Axios.get(`${api_url}/cart?userID=${userID}`)
                .then((res) => {
                    dispatch({
                        type: "GET_CART_DATA",
                        payload: res.data
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
                swal("Added to cart", "Barang sudah masuk ke dalam cart", "success")
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getCartData = (userID) => {
    return (dispatch) =>{
        Axios.get(`${api_url}/cart?userID=${userID}`)
            .then((res) => {
                dispatch({
                    type: "GET_CART_DATA",
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

// export const keepCartData = (userID) => {
//     return (dispatch) => {
//         Axios.get(`${api_url}/cart?userID=${userID}`)
//             .then((res) => {
//                 dispatch({
//                     type: "LOGIN",
//                     payload: res.data
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }
// }