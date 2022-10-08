import React from "react";

import Nav from "./nav";

import "../styles/global.scss";

export default function Layout({ children }) {
	return (
		<>
			<div className="portal-root" />
			<Nav />
			<main className="w-full bg-blue-50">{children}</main>
		</>
	);
}
