import React, { useContext, useReducer } from 'react';
import { productReducer } from '../reducers';
import { AuthContext, types } from '../../auth';
import { doc } from 'firebase/firestore';
import { collection, setDoc, getDocs, getDoc, deleteDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FirebaseDB } from '../../firebase/config';
import { productTypes } from "../types";
import { ProductContext } from './ProductContext';

const initialState = {
  products: [],
  productsComment: {},
  followers: [],
  youFollow: []
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

  const getAllUsers = async () => {
    try {
      const usersCollectionRef = collection(FirebaseDB, 'users');
      const usersSnapshot = await getDocs(usersCollectionRef);
      return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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

  const getCommentCount = async (productId) => {
    try {
      const commentsCollectionRef = collection(FirebaseDB, `products/${productId}/comments`);
      const commentsSnapshot = await getDocs(commentsCollectionRef);
      return commentsSnapshot.size;
    } catch (error) {
      console.error('Error getting comment count:', error);
      return 0;
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



  const followUser = async (userIdToFollow) => {
    try {
      const userDocRef = doc(FirebaseDB, `users/${user.uid}`);
      const userToFollowDocRef = doc(FirebaseDB, `users/${userIdToFollow}`);

      if (userIdToFollow === user.uid) {
       alert('You not follow to self.');
      } else { 
        await updateDoc(userDocRef, { following: arrayUnion(userIdToFollow) });
        await updateDoc(userToFollowDocRef, { followers: arrayUnion(user.uid) });
        alert('You follow:' + user.displayName)
      }
      

      dispatch({ type: productTypes.followUser, payload: userIdToFollow });
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const unfollowUser = async (userIdToUnfollow) => {
    try {
      const userDocRef = doc(FirebaseDB, `users/${user.uid}`);
      const userToUnfollowDocRef = doc(FirebaseDB, `users/${userIdToUnfollow}`);

      await updateDoc(userDocRef, { youFollow: arrayRemove(userIdToUnfollow) });
      await updateDoc(userToUnfollowDocRef, { followers: arrayRemove(user.uid) });

      dispatch({ type: productTypes.unfollowUser, payload: userIdToUnfollow });
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const getFollowersAndFollowings = async (userId) => {
    console.log(userId)
    try {
      const userDocRef = doc(FirebaseDB, `users/${userId}`);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log(userData)
        return {
          
          followers: userData.followers || [],
          following: userData.following || []
        };
      }
      return { followers: [], followings: [] };
    } catch (error) {
      console.error('Error getting followers and followings:', error);
      return { followers: [], followings: [] };
    }
  };



  return (
    <ProductContext.Provider value={{
      ...productsState,
      saveProduct,
      getProducts,
      deleteProduct,
      editProduct,
      getAllProducts,
      getProductComments,
      addComment,
      getCommentCount,
      followUser,
      unfollowUser,
      getFollowersAndFollowings,
      getAllUsers
    }}>
      {children}
    </ProductContext.Provider>
  );
};