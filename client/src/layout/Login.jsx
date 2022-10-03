import useAuth from "../../hooks/useAuth";

export default function Login () {

    const authGoogle = () => {
        window.open(`${import.meta.env.VITE_SERVER}/auth/google`, "_self")
    };
    // const { authGoogle } = useAuth();

    return(
                
        <div className="mt-24">
            <button className="btn" onClick={authGoogle}>Login with Google</button>
        </div>
        
        
        
    )
}