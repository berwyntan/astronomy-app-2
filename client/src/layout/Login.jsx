import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import eye from "../icons/eye.svg"
import eyeSlash from "../icons/eye-slash.svg"
import { Link, useNavigate } from "react-router-dom";

export default function Login () {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const authGoogle = () => {
        window.open(`${import.meta.env.VITE_SERVER}/auth/google`)
    };

    const { setIsAuth } = useAuth();

    const navigate = useNavigate();

    const handleUserName = (event) => {
        // console.log(event.target.value);
        setUserName(event.target.value);
    }

    const handlePassword = (event) => {
        // console.log(event.target.value);
        setPassword(event.target.value);
    }

    const handleShowPassword = (event) => {
        event.preventDefault();
        setShowPassword(prev => !prev);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setUserName("");
        setPassword("")
        setIsAuth(true);
        navigate("/")
    }

    return(
                
        // <div className="mt-24">
        //     <button className="btn" onClick={authGoogle}>Login with Google</button>
        // </div>
        <div className="mt-36">

        <form className="flex flex-col ml-10" onSubmit={handleLogin}>

            <h1 className="ml-6 mb-6 text-lg font-semibold">LOGIN</h1>

            <input type="text" placeholder="username" 
                className="input input-bordered w-full max-w-xs mb-4" onChange={handleUserName}
                value={userName} autoComplete="on" />

            <div className="flex">
                <input type={showPassword ? "text" : "password"} placeholder="password" 
                    className="input input-bordered w-full max-w-xs" onChange={handlePassword}
                    value={password} autoComplete="off"/>
                <div>{showPassword
                    ? <button className="btn btn-square btn-ghost dark:invert" onClick={handleShowPassword}>
                        <img className="h-5" src={eyeSlash} />
                        </button>
                    : <button className="btn btn-square btn-ghost dark:invert" onClick={handleShowPassword}>
                        <img className="h-5" src={eye} />
                        </button>
                }</div>
            </div>

            <button type="submit" className="btn w-full max-w-xs mt-4" onClick={handleLogin}>LOG IN</button>
            <div className="ml-6 mt-4">
                Don't have an account? <Link to="/signup" className="link link-primary">Create one.</Link>
            </div>
            
        </form>
        </div>
        
        
        
    )
}