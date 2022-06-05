import { Button } from "@material-ui/core";
import { signOut, getAuth, reload } from "firebase/auth";
import Navbar from "../components/Navbar";
import React from "react";

const HomePage = () => {
	const auth = getAuth();
	return (
		<>
			{/* <Navbar authing/> */}
			<h1>HomePage</h1>
			<Button onClick={() => { signOut(auth); window.location.reload(); }}>Sign Out</Button>
		</>
	);
};

export default HomePage;
