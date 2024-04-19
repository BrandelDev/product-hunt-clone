
import React, { useState, useRef, useContext } from 'react';
import './CreateProfileStyles.css'
import avatarLogo from '../../assets/Auth/CreateProfile/avatar-logo.png'
import { AuthContext } from '../context';
import { useNavigate } from "react-router-dom"

export const CreateProfilePage = () => {

    const { login, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const miInputRef = useRef(null);
    const handleButtonClick = () => {
        console.log('Hola')
        miInputRef.current.click();
    }
    const [idUser, setIdUser] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');


    const handleUserNameChange = (e) => setUserName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleAvatarChange = (e) => setAvatar(e.target.files[0]);

    const loginNewUser = (e = '') => {
        const lastPath = localStorage.getItem('lastPath') || '/user-logged/post-product'
        login(e);
        navigate(lastPath, {
            replace: true
        })

    }

    const handleSubmit = (e) => {
        setIdUser(Math.floor(Math.random() * 100) + 1);
        setCreatedAt(new Date().toISOString())
        e.preventDefault();

        const userObj = {
            idUser: idUser,
            userName: userName,
            email: email,
            password: password,
            bio: bio,
            avatar: avatar,
            createdAt: createdAt,
            updatedAt: ''
        }

        loginNewUser(userObj);

    };



    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className='header-new-profile'>

                        </div>
                        <h3 className="card-title text-left mb-4">Create your profile</h3>

                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className='col-2'>
                                            <div className='mb-3'>
                                                <div className="card align-items-center d-flex" >
                                                    <img className=" p-3 card-img-top" src={avatarLogo} alt="Card image cap" />

                                                </div>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <h3>Avatar</h3><br />
                                            <a onClick={handleButtonClick} className='btn btn-warning'>Upload avatar</a>
                                            <input type='file' className='d-none' ref={miInputRef} onChange={handleAvatarChange} accept=".png, .jpeg, .jpg" />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="userName" className="form-label">User name:</label>
                                        <input
                                            type="text"
                                            id="userName"
                                            className="form-control"
                                            value={userName}
                                            onChange={handleUserNameChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input
                                            type="text"
                                            id="email"
                                            className="form-control"
                                            value={email}
                                            onChange={handleEmailChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password:</label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="bio" className="form-label">Bio:</label>
                                        <textarea
                                            id="bio"
                                            className="form-control"
                                            value={bio}
                                            onChange={handleBioChange}
                                            rows={4}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary">Create Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
