import { Navigate, Routes, Route } from 'react-router-dom';
import { Navbar } from '../../ui/components/Navbar';
import { HomePage } from '../pages';
import { CreateProfilePage } from '../../auth/pages/CreateProfilePage';
import SignInPage from '../../auth/pages/SignInPage';


export const ProductHuntRouter = () => { 

    return(
        <>
        <Navbar/>

       
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/welcome' element={<SignInPage/>}/>
                <Route path='/register' element={<CreateProfilePage/>}/>
            </Routes>


        </>
    )

}