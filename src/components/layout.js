import React from "react";

import Nav from "./nav";

import "../styles/global.scss";

export default function Layout({ children }) {
	return (
		<>
			<Nav />
			<main className="ml-40 w-full bg-blue-50">{children}</main>
		</>
	);
}
