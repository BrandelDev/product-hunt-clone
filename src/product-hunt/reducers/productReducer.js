import { productTypes } from "../types";

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case productTypes.saveProduct:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        case productTypes.updateProduct:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                )
            };
        case productTypes.deleteProduct:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload.id)
            };

        case productTypes.addComment:
            const { productId, commentData } = action.payload;
            return {
                ...state,
                productsComment: {
                    ...state.productsComment,
                    [productId]: {
                        ...state.productsComment[productId],
                        [commentData.userId]: commentData
                    }
                }
            }

        case productTypes.setComment:
            const { productId: pid, comments } = action.payload;
            return {
                ...state,
                productsComment: {
                    ...state.productsComment,
                    [pid]: comments
                }
            };
        case productTypes.followUser:
            return {
                ...state,
                youFollow: [state.youFollow, action.payload]
            }
        case productTypes.unFollowUser:
            return {
                ...state,
                youFollow: state.youFollow.filter(userId => userId !== action.payload)
            }

        case productTypes.resetComments:
            return {
                ...state,
                productsComment: {}
            };
        default:
            return state;
    }
}