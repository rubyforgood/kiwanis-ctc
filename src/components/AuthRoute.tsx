import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export interface IAuthRouteProps { }
const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
	const { children } = props;
	const auth = getAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const AuthCheck = onAuthStateChanged(auth, (user) => {
		if (user) {
			setLoading(false);
		} else {
			navigate("/login");
		}
	});
	useEffect(() => {
		AuthCheck();
		return () => AuthCheck();
	}, [auth]);
	
	{ loading ? <p>...</p> : <div></div>; }
	return <>{children}</>;
};

export default AuthRoute;