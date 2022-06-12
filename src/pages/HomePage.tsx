import { signOut, getAuth, reload } from "firebase/auth";
import Navbar from "../components/Navbar";
import React from "react";

const HomePage = () => {
	const auth = getAuth();
	return (
		<>
			{/* <Navbar authing/> */}
			{/* <h1>HomePage</h1> */}
			<p>test3</p>
			<h1>test</h1>
			{/* <Button onClick={() => { signOut(auth); window.location.reload(); }}>Sign Out</Button> */}
			<h2>test2</h2>
		</>
	);
};

export default HomePage;
