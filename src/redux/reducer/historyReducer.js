const INITIAL_STATE = {
    historyData : []
}

export const historyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "GET_HISTORY_DATA":
            return {
                historyData : action.payload
            }
        default:
            return state
    }
}