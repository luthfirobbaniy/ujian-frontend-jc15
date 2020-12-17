import Axios from "axios"
import { api_url } from "../../helpers/api_url"
import swal from "sweetalert"

export const getHistoryData = (userID) => {
    return (dispatch) =>{
        Axios.get(`${api_url}/transaction-history?userID=${userID}`)
            .then((res) => {
                dispatch({
                    type: "GET_HISTORY_DATA",
                    payload: res.data
                })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}