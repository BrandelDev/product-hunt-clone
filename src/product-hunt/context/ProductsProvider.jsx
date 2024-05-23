import React, { useContext, useReducer } from 'react';
import { productReducer } from '../reducers';
import { AuthContext, types } from '../../auth';
import { doc } from 'firebase/firestore';
import { collection, setDoc, getDocs, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { productTypes } from "../types";
import { ProductContext } from './ProductContext';

const initialState = {
  products: [],
  productsComment: {}
};



export const ProductsProvider = ({ children }) => {
  const [productsState, dispatch] = useReducer(productReducer, initialState);
  const { user } = useContext(AuthContext);

  const saveProduct = async (product) => {
    try {

      const newDocRef = doc(collection(FirebaseDB, `${user.uid}/collection/products`));
      console.log(newDocRef)
      await setDoc(newDocRef, product);
      product.id = newDocRef.id;

      const action = { type: productTypes.saveProduct, payload: product };
      dispatch(action); // Actualizar el estado después de guardar el producto
      alert("Your product was be post");

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
      alert("Your product was be update correctly");
      console.log('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }



  const deleteProduct = async (productId) => {
    console.log(productId)

    try {
      await deleteDoc(doc(FirebaseDB, `${user.uid}/collection/products`, productId.id));
      const action = { type: productTypes.deleteProduct, payload: productId }
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

  const getAllUserIds = async () => {
    try {
      const usersCollectionRef = collection(FirebaseDB, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      return usersSnapshot.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Error obteniendo IDs de usuarios:', error);
      return [];
    }
  };

  const getAllProducts = async () => {
    try {
      const productos = [];
      const userIds = await getAllUserIds();

      for (const userId of userIds) {
        const productsCollectionRef = collection(FirebaseDB, `${userId}/collection/products`);
        const productsSnapshot = await getDocs(productsCollectionRef);

        productsSnapshot.forEach((doc) => {
          productos.push({
            id: doc.id,
            data: doc.data(),
          });
        });
      }

      return productos;
    } catch (error) {
      console.error('Error obteniendo documentos de productos:', error);
      return [];
    }
  };

  const addComment = async (productId, content, rate, user) => {
    console.log(user)
    try {
      const newCommentRef = doc(collection(FirebaseDB, `products/${productId}/comments`));
      const commentData = {
        userDisplayName: user.displayName,
        userPhotoUrl: user.photoURL,
        userId: user.uid,
        content,
        rate,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(newCommentRef, commentData);

      dispatch({
        type: productTypes.addComment,
        payload: { productId, commentData }
      });

      alert("Your comment was added");
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const getProductComments = async (productId) => {
    try {
      const comments = {};
      const commentsCollectionRef = collection(FirebaseDB, `products/${productId}/comments`);
      const commentsSnapshot = await getDocs(commentsCollectionRef);

      commentsSnapshot.forEach((doc) => {
        comments[doc.id] = doc.data();
      });

      dispatch({
        type: productTypes.setComment,
        payload: { productId, comments }
      });

      return comments;
    } catch (error) {
      console.error('Error getting product comments:', error);
      return {};
    }
  };



  return (
    <ProductContext.Provider value={{ ...productsState, saveProduct, getProducts, deleteProduct, editProduct, getAllProducts, getProductComments, addComment }}>
      {children}
    </ProductContext.Provider>
  );
};