import { Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import { HomePage } from '../pages';


export const ProductHuntRouter = () => { 

    return(
        <>
        <Navbar/>

       
            <Routes>
                <Route path='/' element={<HomePage/>}/>
            </Routes>


        </>
    )

}