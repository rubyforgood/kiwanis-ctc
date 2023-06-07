import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login";

export interface AuthRouteProps { children: React.ReactNode }

const AuthRoute = ({ children }: AuthRouteProps ) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                navigate("/");
            }
        });
        return () => { unsub(); };
    }, [auth, navigate]);

    if (loading) {
        return <Login />;
    }

    return <>{children}</>;
};

export default AuthRoute;