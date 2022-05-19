import { Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export interface IAdminLoginProps { }
const AdminLogin: React.FunctionComponent<IAdminLoginProps> = (props) => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [authing, setAuthing] = useState(false);
	const signInWithGoogle = async () => {
		setAuthing(true);
		signInWithPopup(auth, new GoogleAuthProvider())
			.then(res => navigate("/"))
			.catch((error) => {
				setAuthing(false);
				console.log(error);
			});
	};
	return (
		<>
			<Typography variant="h1">admin login</Typography>
			<Button onClick={() => signInWithGoogle()} disabled = {authing}>
				Sign In
			</Button>
		</>
	);
};

export default AdminLogin;