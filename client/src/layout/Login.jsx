import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import eye from "../icons/eye.svg"
import eyeSlash from "../icons/eye-slash.svg"
import { Link, useNavigate } from "react-router-dom";
import axios from '../api/axios';

export default function Login () {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { setAuthDetails } = useAuth();

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

    const handleLogin = async (event) => {
        
        event.preventDefault();

        try {

            const response = await axios.post("/auth", 
                JSON.stringify({ 
                    user: userName,
                    pwd: password
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response.data));
            const accessToken = response?.data?.accessToken;
            // console.log(accessToken)
            
            setAuthDetails({ 
                userName: userName, 
                likedItemData: response?.data.likedItemData,
                albumData: response?.data.albumData,
                accessToken: accessToken
             });
            setUserName("");
            setPassword("");
            // setIsAuth(true);
            navigate("/")
        } catch (err) {
            if (!err?.response) {
                setErrorMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrorMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrorMsg("Incorrect Username or Password");
            } else {
                setErrorMsg("Login Failed");
            }
        }        
    }

    // clear err msg when user retypes form
    useEffect(() => {
        setErrorMsg("");
    }, [userName, password])

    return(
                
        // <div className="mt-24">
        //     <button className="btn" onClick={authGoogle}>Login with Google</button>
        // </div>
        <div className="mt-36">

        <form className="flex flex-col ml-10" onSubmit={handleLogin}>

            <h1 className="ml-6 mb-6 text-xl font-semibold">LOGIN</h1>

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

            <button type="submit" className="btn w-full max-w-xs mt-4 mb-2">LOG IN</button>
            <p className="text-red-600 text-sm">{errorMsg}</p>
            <div className="ml-6 mt-4">
                Don't have an account? <Link to="/signup" className="link link-hover dark:text-slate-50">
                    Create one.
                </Link>
            </div>
            
        </form>

        {/* <div className="w-full max-w-xs mt-4 ml-10">
            <div className="divider">OR</div> 
            <button className="btn w-full max-w-xs mt-2" onClick={authGoogle}>LOG IN W GOOGLE</button>
        </div>         */}
        

        </div>
        
        
        
    )
}