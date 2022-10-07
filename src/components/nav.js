import React from "react";
import { Link } from "gatsby";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Nav() {
	return (
		<div className="fixed top-0 right-0 left-0 flex justify-center bg-blue-400 px-4 z-20">
			<div className="container w-full flex items-center justify-between h-16">
				<div className="flex justify-around">
					<div className="pr-4">
						<a
							href="https://github.com/blam404"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FaGithub className="w-6 h-6 text-gray-100" />
						</a>
					</div>
					<div className="px-4">
						<a
							href="https://www.linkedin.com/in/blam404/"
							rel="noopener noreferrer"
							target="_blank"
						>
							<FaLinkedin className="w-6 h-6 text-gray-100" />
						</a>
					</div>
				</div>
				<nav className="my-24 text-gray-100 text-xl flex">
					<div className="pr-4">
						<Link to="/" className="text-gray-100 no-underline">
							Home
						</Link>
					</div>
					<div className="px-4">
						<a
							href="/#about"
							className="text-gray-100 no-underline"
						>
							About
						</a>
					</div>
					<div className="px-4">
						<a
							href="/#experience"
							className="text-gray-100 no-underline"
						>
							Experience
						</a>
					</div>
					<div className="px-4">
						<a
							href="/#projects"
							className="text-gray-100 no-underline"
						>
							Projects
						</a>
					</div>
					<div className="pl-4">
						<a href="/#blog" className="text-gray-100 no-underline">
							Blog
						</a>
					</div>
				</nav>
			</div>
		</div>
	);
}
