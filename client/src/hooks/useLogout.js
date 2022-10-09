import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuthDetails } = useAuth();

    const logout = async () => {
        setAuthDetails({});
        try {
            const response = await axios('/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout