
import { Routes, Route } from 'react-router-dom'
import { PublicRouter } from './PublicRouter'
import { PrivateRouter } from './PrivateRouter'
import { ProductHuntRouter } from '../product-hunt/routes/ProductHuntRouter'
import { ProductPost } from '../product-hunt/components/ProductPost'
import { Navbar } from '../../src/ui/components';
import UserView from '../product-hunt/components/UserView'
import { ProductsProvider } from '../product-hunt/context/ProductsProvider'



export const AppRouter = () => {

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path='/*'
                    element={
                        <PublicRouter>
                            <ProductHuntRouter />
                        </PublicRouter>
                    }
                ></Route>

                <Route
                    path='/user-logged/post-product' element={
                        <PrivateRouter>
                            <ProductsProvider>
                                <ProductPost/>
                            </ProductsProvider>

                        </PrivateRouter>
                    }
                ></Route>
                <Route path="/user-view" element={
                    <PrivateRouter>

                        <UserView />
                    </PrivateRouter>
                }>

                </Route>


            </Routes>
        </>
    )
}