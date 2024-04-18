
import React, { useState } from 'react';
import './CreateProfileStyles.css'

export const CreateProfilePage = () => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleUserNameChange = (e) => setUserName (e.target.value);
    const handleEmailChange = (e) => setEmail (e.target.value);
    const handleBioChange = (e) => setBio(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica para guardar el perfil en tu backend
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Bio:', bio);
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
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={handleNameChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Email:</label>
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
    );
};
