import React, { useState, useContext } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../product-hunt/hooks';
import { Link } from 'react-router-dom';
import avatarLogo from '../../assets/Auth/CreateProfile/avatar-logo.png';
import './CreateProfileStyles.css'

const initForm = {
    userName: '',
    email: '',
    password: '',
    bio: '',
};


export const CreateProfilePage = () => {
    const { register, errorMessage } = useContext(AuthContext);
    const { userName, email, password, bio, onInputChange } = useForm(initForm);
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    


        const isValidRegister = await register(email, password, userName);

        if (isValidRegister) {
            const lastPath = localStorage.getItem('lastPath') || '/user-view';
            navigate(lastPath, { replace: true });
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className='header-new-profile'>
                    </div>
                    <h3 className="card-title text-left mb-4">Create your profile</h3>
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="mb-3">
                                            <div className="card align-items-center d-flex">
                                                <img className="p-3 card-img-top" src={avatarLogo} alt="Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h3>Avatar</h3><br />
                                        <input type="file" onChange={handleAvatarChange} accept=".png, .jpeg, .jpg" />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">User name:</label>
                                    <input
                                        type="text"
                                        id="userName"
                                        name="userName"
                                        className="form-control"
                                        value={userName}
                                        onChange={onInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={onInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={onInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bio" className="form-label">Bio:</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        className="form-control"
                                        value={bio}
                                        onChange={onInputChange}
                                        rows={4}
                                    />
                                </div>
                                <br />
                                {!errorMessage ? null :
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                }
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Create Profile</button>
                                </div>
                            </form>
                            <div className="text-center pt-2">
                                <span>Do you have an existing account?</span>
                                <Link to="/welcome">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProfilePage;