import { Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import { HomePage } from '../pages';
import { CreateProfilePage } from '../../auth/pages/CreateProfilePage';
import SignInPage from '../../auth/pages/SignInPage';
import { ProductPost } from '../components/ProductPost';


export const ProductHuntRouter = () => { 

    return(
        <>
       

       
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/welcome' element={<SignInPage/>}/>
                <Route path='/register' element={<CreateProfilePage/>}/>
                <Route path='user-logged/post-product' element={<ProductPost/>}/>
            </Routes>


        </>
    )

}