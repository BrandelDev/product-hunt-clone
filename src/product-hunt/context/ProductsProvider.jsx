import React, { useContext, useReducer } from 'react';
import { productReducer } from '../reducers';
import { AuthContext, types } from '../../auth';
import { doc } from 'firebase/firestore';
import { collection, setDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { productTypes } from "../types";
import { ProductContext } from './ProductContext';

const initialState = {
  products: []
};



export const ProductsProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(productReducer, initialState);
  const { user } = useContext(AuthContext);

  const saveProduct = async (product) => {
    try {
      console.log(FirebaseDB)
      const newDocRef = doc(collection(FirebaseDB, `${user.uid}/collection/products`));
      console.log(newDocRef)
      await setDoc(newDocRef, product);
      product.id = newDocRef.id;

      const action = { type: productTypes.saveProduct, payload: product };
      dispatch(action); // Actualizar el estado después de guardar el producto

    } catch (error) {
      console.error('Error saving product:', error);
    }
  };
  const editProduct = async (product) => {
    try {
      await updateDoc(doc(FirebaseDB, `${user.uid}/collection/products`, product.id), product
      );
      const action = { type: productTypes.updateProduct, payload: product }
      dispatch(action)
      console.log('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }



  const deleteProduct = async (productId) => {

    try {
      await deleteDoc(doc(FirebaseDB, `${user.uid}/collection/products`, productId));
      const action = { type:productTypes.deleteProduct, payload: productId} 
      dispatch(action)

      alert('The product was be deleted');
    } catch (error) {
      console.log('Error al eliminar el producto:', error)
    }
  }

  const getProducts = async () => {

    try {
      const productos = [];
      const collectionRef = collection(FirebaseDB, `${user.uid}/collection/products`);
      const querySnapshot = await getDocs(collectionRef);


      querySnapshot.forEach((doc) => {
        productos.push({
          id: doc.id,
          data: doc.data()
        });
      });


      return productos;


    } catch (error) {
      console.error("Error obteniendo documentos de productos:", error);
      return [];
    }
  };


  return (
    <ProductContext.Provider value={{ ...productsState, saveProduct, getProducts, deleteProduct, editProduct }}>
      {children}
    </ProductContext.Provider>
  );
};