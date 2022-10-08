import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";

import useMediaQuery from "../utils/useMediaQuery";

import { FaBars, FaGithub, FaLinkedin, FaTimes } from "react-icons/fa";

export default function Nav() {
	const [showModal, setShowModal] = useState(false);
	const [translate, setTranslate] = useState("translateY(0)");

	const modalRef = useRef();

	useEffect(() => {
		if (showModal) {
			setTranslate("translateX(-100%)");
		}
	}, [showModal]);

	useEffect(() => {
		if (showModal) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [showModal]);

	const openModal = () => {
		setShowModal(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setTranslate("translateX(0)");
		setTimeout(() => {
			setShowModal(false);
		}, 300);
		document.body.style.overflow = "auto";
	};

	const handleClickOutside = (event) => {
		if (
			modalRef.current &&
			!modalRef.current.parentNode.contains(event.target)
		) {
			closeModal();
		}
	};

	return (
		<div className="fixed top-0 w-full flex justify-center bg-blue-400 shadow-md z-20">
			<div className="container w-full flex items-center justify-between px-4 h-16">
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
				<div>
					{useMediaQuery(1024) ? (
						<nav className="my-24 text-gray-100 text-xl flex">
							<div className="pr-4">
								<Link
									to="/"
									className="text-gray-100 no-underline"
								>
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
								<a
									href="/#blog"
									className="text-gray-100 no-underline"
								>
									Blog
								</a>
							</div>
						</nav>
					) : (
						<>
							<div className="cursor-pointer" onClick={openModal}>
								<FaBars className="w-6 h-6 text-gray-100" />
							</div>
							{showModal && (
								<>
									<div
										ref={modalRef}
										className="fixed h-full w-full sm:w-1/2 md:w-2/5 sm:shadow-2xl left-full bottom-0 top-0 right-0 bg-blue-300 z-30 overflow-y-auto transition-all duration-250"
										style={{
											transform: translate,
										}}
									>
										<div
											className="absolute top-4 right-4 cursor-pointer"
											onClick={closeModal}
										>
											<FaTimes className="w-8 h-8 text-gray-200" />
										</div>
										<nav className="text-3xl flex flex-col h-full justify-center text-center text-gray-100">
											<div
												className="mb-2"
												onClick={closeModal}
											>
												<Link
													to="/"
													className="text-gray-100 no-underline"
												>
													Home
												</Link>
											</div>
											<div
												className="mb-2"
												onClick={closeModal}
											>
												<a
													href="/#about"
													className="text-gray-100 no-underline"
												>
													About
												</a>
											</div>
											<div
												className="mb-2"
												onClick={closeModal}
											>
												<a
													href="/#experience"
													className="text-gray-100 no-underline"
												>
													Experience
												</a>
											</div>
											<div
												className="mb-2"
												onClick={closeModal}
											>
												<a
													href="/#projects"
													className="text-gray-100 no-underline"
												>
													Projects
												</a>
											</div>
											<div
												className="mb-2"
												onClick={closeModal}
											>
												<a
													href="/#blog"
													className="text-gray-100 no-underline"
												>
													Blog
												</a>
											</div>
										</nav>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
