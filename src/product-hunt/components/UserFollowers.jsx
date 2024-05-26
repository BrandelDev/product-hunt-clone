import React from 'react'
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../../auth';
import { useContext } from "react";
import { useEffect, useState } from 'react';


const UserFollowers = () => {
    const { getFollowersAndFollowings, getAllUsers } = useContext(ProductContext);
    const { user } = useContext(AuthContext);
    const [follower, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        const fetchFollowersAndFollowings = async () => {
            if (user) {
                const { followers, following } = await getFollowersAndFollowings(user.uid);
                let usersFollowers = []
                let usersFollowigns = [];
                let users = await getAllUsers();
                console.log(users);
                               
                usersFollowers = users.filter(user => followers?.includes(user.uid));
                usersFollowigns = users.filter(user => following?.includes(user.uid));
                setFollowers(usersFollowers);
                setFollowings(usersFollowigns);
            }
        }
        fetchFollowersAndFollowings();
    }, [user, getFollowersAndFollowings]);

    return (
        <div className='row mt-3'>
            <div className='col-lg-6'>
                <div className="container">
                    <h2>Followers</h2>
                    <ul>
                        {follower.map((follower) => (
                            <li key={follower.uid}>
                                <img width='50px' className='me-3' src={follower.photoURL} /><span>{follower.displayName}</span></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='container'>
                    <h2>Following</h2>
                    <ul>
                        {followings.map((following) => (
                            <li key={following.uid}>
                                 <img width='50px' className='me-3' src={following.photoURL} />
                                {following.displayName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserFollowers
