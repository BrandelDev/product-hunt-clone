import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../product-hunt/components/HomePage'
export const AppRouter = ()=>{

    return(
        <>
        <Routes>
            <Route path=''
            element={
                <PublicRouter>
                    <HomePage/>
                </PublicRouter>
            }/>

        </Routes>
        </>
    )


}