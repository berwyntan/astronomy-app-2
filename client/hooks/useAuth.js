import { useContext } from "react";
import { AuthContext } from "../src/App";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;