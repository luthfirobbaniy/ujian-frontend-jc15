import Axios from "axios"
import { api_url } from "../../helpers/api_url"

export const login = (email, password) => {
    return (dispatch) => {
        Axios.get(`${api_url}/users?email=${email}&password=${password}`)
            .then((res) => {
                if(res.data.length !== 0){
                    dispatch({
                        type: "LOGIN",
                        payload: res.data[0]
                    })
                    localStorage.setItem('id', res.data[0].id)
                }else{
                    dispatch(register(email, password))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const register = (email, password) => {
    return (dispatch) => {
        Axios.get(`${api_url}/users?email=${email}`)
        .then((res) => {
            if(res.data.length === 0){
                Axios.post(`${api_url}/users`, {email, password})
                .then((res) => {
                    dispatch({
                        type: "LOGIN",
                        payload: res.data
                    })
                    localStorage.setItem('id', res.data.id)
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{
                alert("Email sudah ada")
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const keepLogin = (id) => {
    return (dispatch) => {
        Axios.get(`${api_url}/users/${id}`)
            .then((res) => {
                dispatch({
                    type: "LOGIN",
                    payload: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("id")
        dispatch({
            type: "LOGOUT"
        })
    }
}