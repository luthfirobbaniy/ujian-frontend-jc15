import Axios from "axios"
import { api_url } from "../../helpers/api_url"

export const getProductData = () => {
    return(dispatch) => {
        Axios.get(`${api_url}/products`)
            .then((res) => {
                dispatch({
                    type: "GET_PRODUCT_DATA",
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getCategoryData = () => {
    return(dispatch) => {
        Axios.get(`${api_url}/categories`)
            .then((res) => {
                dispatch({
                    type: "GET_CATEGORY_DATA",
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getProductDataByProductID = (productID) => {
    return(dispatch) => {
        Axios.get(`${api_url}/products/${productID}`)
            .then((res) => {
                dispatch({
                    type: "GET_PRODUCT_DATA_BY_PRODUCT_ID",
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}