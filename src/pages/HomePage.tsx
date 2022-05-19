import { Button } from "@material-ui/core";
import { signOut, getAuth, reload } from "firebase/auth";
import React from "react";

const HomePage = () => {
	const auth = getAuth();
	return (
		<div>
			<h1>HomePage</h1>
			<Button onClick={() => { signOut(auth); window.location.reload(); }}>Sign Out</Button>
		</div>
	);
};

export default HomePage;
