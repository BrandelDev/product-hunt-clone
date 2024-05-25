import { Navigate, Routes, Route } from 'react-router-dom';
import { ProductsProvider } from '../../product-hunt/context/ProductsProvider';
import  ProductEdit from '../components/ProductEdit';
import { ProductPost } from '../components/ProductPost';
import UserView from '../components/UserView';
import { HomePage } from '../pages';
import UserFollowers from '../components/UserFollowers';


export const ProductHuntRouter = () => { 

    return(
        <>
            <Routes>
            <Route
                    path='/' element={
                            <ProductsProvider>
                                <HomePage />
                            </ProductsProvider>
                    }
                ></Route>
            <Route
                    path='/user-logged/post-product' element={
                            <ProductsProvider>
                                <ProductPost />
                            </ProductsProvider>
                    }
                ></Route>
                <Route path="/user-view" element={
                        <ProductsProvider>
                            <UserView />
                        </ProductsProvider>
                }>
                </Route>
                <Route path="/edit-product/:productId" element={
                        <ProductsProvider>
                            <ProductEdit />
                        </ProductsProvider>
                }>
                </Route>

                <Route path="/user-view/following-follows" element={
                    <ProductsProvider>
                        <UserFollowers/>
                    </ProductsProvider>
                }></Route>
               
            </Routes>


        </>
    )

}