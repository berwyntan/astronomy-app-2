import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuthDetails } = useAuth() || {};

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuthDetails(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data);
            console.log("refreshed auth details")
            return {
                ...prev,
                // roles: response.data.roles,
                accessToken: response.data.accessToken,
                userName: response.data.userName,
                likedItemData: response.data.likedItemData,
                albumData: response.data.albumData,
                profilePhoto: response.data.profilePhoto,
                
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;

