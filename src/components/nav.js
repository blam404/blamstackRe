import React from "react";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Nav() {
	return (
		<div className="fixed top-0 bottom-0 left-0 bg-blue-400 flex flex-col w-40">
			<div className="h-40"></div>
			<nav className="my-24 text-gray-100">
				<div className="border-t py-2 text-center">
					<a href="/#about">About</a>
				</div>
				<div className="border-t py-2 text-center">
					<a href="/#experience">Experience</a>
				</div>
				<div className="border-t py-2 text-center">
					<a href="/#projects">Projects</a>
				</div>
				<div className="border-t border-b py-2 text-center">
					<a href="/#blog">Blog</a>
				</div>
			</nav>
			<div className="flex justify-around px-2">
				<div className="mx-2 ">
					<a
						href="https://github.com/blam404"
						rel="noopener noreferrer"
						target="_blank"
					>
						<FaGithub className="w-6 h-6 text-gray-100" />
					</a>
				</div>
				<div className="mx-2 ">
					<a
						href="https://www.linkedin.com/in/blam404/"
						rel="noopener noreferrer"
						target="_blank"
					>
						<FaLinkedin className="w-6 h-6 text-gray-100" />
					</a>
				</div>
			</div>
		</div>
	);
}
