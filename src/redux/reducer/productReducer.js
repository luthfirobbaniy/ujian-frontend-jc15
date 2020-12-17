const INITIAL_STATE = {
    productData: [],
    categoryData: [],
    productDataByProductID: []
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "GET_PRODUCT_DATA":
            return {
                ...state,
                productData: action.payload
            }
        case "GET_CATEGORY_DATA":
            return {
                ...state,
                categoryData: action.payload
            }
        case "GET_PRODUCT_DATA_BY_PRODUCT_ID":
            return {
                ...state,
                productDataByProductID: action.payload
            }
        default:
            return state
    }
}