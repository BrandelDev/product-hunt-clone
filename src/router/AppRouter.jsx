
import { Routes, Route } from 'react-router-dom'
import { PublicRouter } from './PublicRouter'
import { PrivateRouter } from './PrivateRouter'
import { ProductHuntRouter } from '../product-hunt/routes/ProductHuntRouter'
import { CreateProfilePage } from '../auth/pages/CreateProfilePage';

import { Navbar } from '../../src/ui/components';

import { ProductsProvider } from '../product-hunt/context/ProductsProvider'
import SignInPage from '../auth/pages/SignInPage';

import { HomePage } from '../product-hunt/pages'



export const AppRouter = () => {

    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path='/*'
                    element={
                        <PrivateRouter>
                            <ProductHuntRouter />
                        </PrivateRouter>
                    }
                ></Route>
                <Route
                    path='/' element={
                            <ProductsProvider>
                                <HomePage />
                            </ProductsProvider>
                    }
                ></Route>
                <Route path='/welcome' element={<SignInPage/>}/>
                <Route path='/register' element={<CreateProfilePage/>}/>
            </Routes>
        </>
    )
}