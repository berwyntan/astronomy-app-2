import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuthDetails } = useAuth();

    const logout = async () => {
        
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
            setAuthDetails({});
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout