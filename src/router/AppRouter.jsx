
import { Routes, Route } from 'react-router-dom'
import { PublicRouter } from './PublicRouter'
import { PrivateRouter } from './PrivateRouter'
import { ProductHuntRouter } from '../product-hunt/routes/ProductHuntRouter'
import { ProductHuntRouterPrivate } from '../../src/product-hunt/routes/ProductHuntRouterPrivate'
import { ProductPost } from '../product-hunt/components/ProductPost'
import { Navbar } from '../../src/ui/components';



export const AppRouter = () => {

    return (
        <>
         <Navbar/>
            <Routes>
                <Route
                    path='/*'
                    element={
                        <PublicRouter>
                            <ProductHuntRouter/>
                        </PublicRouter>
                    }
                ></Route>

                <Route
                    path='/user-logged/post-product' element={
                        <PrivateRouter>
                            <ProductPost/>
                        </PrivateRouter>
                    }
                ></Route>

            </Routes>
        </>
    )
}