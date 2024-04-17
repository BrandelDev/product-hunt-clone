
import { Routes, Route } from 'react-router-dom'
import { PublicRouter } from './PublicRouter'
import { PrivateRouter } from './PrivateRouter'
import { ProductHuntRouter } from '../product-hunt/routes/ProductHuntRouter'


export const AppRouter = () => {

    return (
        <>
        <Routes>
            <Route
                path='/*'
                element = {
                    <PublicRouter>
                        <ProductHuntRouter/>
                    </PublicRouter>
                }
            ></Route>
        </Routes>
        </>
    )
}