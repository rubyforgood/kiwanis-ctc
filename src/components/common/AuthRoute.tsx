import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export interface IAuthRouteProps { children: React.ReactNode }



const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                navigate("/");
            }
        });
    }, [auth]);

    { loading ? <p>...</p> : <div></div>; }
    return <>{children}</>;
};

export default AuthRoute;