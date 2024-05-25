import React from 'react'
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../../auth';


const UserFollowers = () => {
    const { getFollowersAndFollowings } = useContext(ProductContext);
    const { user } = useContext(AuthContext);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
  
    useEffect(() => {
      const fetchFollowersAndFollowings = async () => {
        if (user) {
          const { followers, followings } = await getFollowersAndFollowings(user.uid);
          setFollowers(followers);
          setFollowings(followings);
        }
      };
  
      fetchFollowersAndFollowings();
    }, [user, getFollowersAndFollowings]);
  
    return (
      <div className="container">
        <h2>Followers</h2>
        <ul>
          {followers.map((followerId) => (
            <li key={followerId}>{followerId}</li>
          ))}
        </ul>
        <h2>Following</h2>
        <ul>
          {followings.map((followingId) => (
            <li key={followingId}>{followingId}</li>
          ))}
        </ul>
      </div>
    );
  };

export default UserFollowers
