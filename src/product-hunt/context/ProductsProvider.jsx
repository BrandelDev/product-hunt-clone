import React, { useContext, useReducer } from 'react'
import { productReducer } from '../reducers';
import { AuthContext } from '../../auth';
import { doc } from 'firebase/firestore/lite';
import { collection, setDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { productTypes } from "../types";
import { ProductContext } from './ProductContext';

const initialState = {
  products: []
}

export const ProductsProvider = ({children}) => {
  const [productsState, dispatch] = useReducer(productReducer, initialState);

  const { user } = useContext(AuthContext);

  const saveProduct = async (product) => {
    try {
      const newDoc = doc(collection(FirebaseDB, `${user.uid}/product-hunt-collection`))

      await setDoc(newDoc, product);

      product.id = newDoc.id

      const action = { type: productTypes.saveProduct, payload: product}

    } catch (error) { }
  }

  return(
    <ProductContext.Provider value={
      { ...productsState,
        saveProduct
      }
    }>
      { children }
    </ProductContext.Provider>
  )

}


