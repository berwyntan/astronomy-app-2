import { useContext } from "react";
import { AuthContext } from "../App";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;