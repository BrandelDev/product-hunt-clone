import { productTypes } from "../types";

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case productTypes.saveProduct:
            return {
                ...state,
                products: state.products.push(action.payload)
            }
        default:
           return state;
      
    }
}