import { Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../../ui';
import { HomePage } from '../product-hunt/components'


export const ProductHuntRouter = () => { 

    return(
        <>
        <Navbar/>
        <div className='container'>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
            </Routes>
        </div>

        </>
    )

}