import React, { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import Layout from "../../../components/layout";

import { FaChevronDown } from "react-icons/fa";

import "../../../styles/hacks.scss";

gsap.registerPlugin(TextPlugin);
const { random } = gsap.utils;

export default function VarHack() {
	// SETTING SECTION
	const inputMenu = useRef();
	const [inputs, setInputs] = useState(6);
	const [showInputMenu, toggleShowInputMenu] = useState(false);
	const inputValues = [6, 7, 8, 9, 10];

	const timerMenu = useRef();
	const [timer, setTimer] = useState(15000);
	const [showTimerMenu, toggleShowTimerMenu] = useState(false);
	const timerValues = [15000, 20000, 25000, 30000];
	const timerRef = useRef();
	const [timerCount, setTimerCount] = useState(0);

	const [showNumbers, setShowNumbers] = useState(false);

	const handleClickOutsideInput = (event) => {
		if (inputMenu.current && !inputMenu.current.contains(event.target)) {
			toggleShowInputMenu(false);
		}
	};

	const handleClickOutsideTimer = (event) => {
		if (timerMenu.current && !timerMenu.current.contains(event.target)) {
			toggleShowTimerMenu(false);
		}
	};

	useEffect(() => {
		if (showInputMenu) {
			document.addEventListener("mousedown", handleClickOutsideInput);
			return () => {
				document.removeEventListener(
					"mousedown",
					handleClickOutsideInput
				);
			};
		} else if (showTimerMenu) {
			document.addEventListener("mousedown", handleClickOutsideTimer);
			return () => {
				document.removeEventListener(
					"mousedown",
					handleClickOutsideTimer
				);
			};
		}
	}, [showInputMenu, showTimerMenu]);

	// VAR HACK SECTION
	const hackContainer = useRef();
	const hackWrapper = useRef();
	const [userInputNum, setUserInputNum] = useState(0);
	const [currentInputNum, setCurrentInputNum] = useState(0);
	// stages order: start, initialize, showNumber, userInput, shutdown, end
	const [stage, setStage] = useState("end");
	const [correct, setCorrect] = useState(false);

	useEffect(() => {
		switch (stage) {
			case "start":
				stageStart();
				break;
			case "initialize":
				stageInitialize();
				break;
			case "showNumber":
				stageShowNumber();
				break;
			case "userInput":
				stageUserInput();
				break;
			case "shutdown":
				stageShutdown();
				break;
			default:
		}
	}, [stage]);

	useEffect(() => {
		if (currentInputNum === inputs) {
			setCorrect(true);
			setStage("shutdown");
		}
	}, [currentInputNum]);

	useEffect(() => {
		if (stage === "userInput") {
			if (userInputNum === currentInputNum + 1) {
				setCurrentInputNum(userInputNum);
			} else {
				setStage("shutdown");
			}
		}
	}, [userInputNum]);

	useEffect(() => {
		if (timerCount * 1000 === timer) {
			stopTimer();
			setStage("shutdown");
		}
	}, [timerCount]);

	const stageStart = () => {
		gsap.timeline()
			.fromTo(
				hackWrapper.current,
				{
					display: "initial",
				},
				{
					left: "0",
					right: "0",
					duration: 0.2,
				}
			)
			.fromTo(
				hackContainer.current,
				{
					display: "initial",
				},
				{
					width: "1280px",
					duration: 0.2,
				},
				"-=0.2"
			)
			.to(hackWrapper.current, {
				top: "0",
				bottom: "0",
				duration: 0.2,
			})
			.to(
				hackContainer.current,
				{
					height: "720px",
					duration: 0.2,
				},
				"-=0.2"
			);
		setTimeout(() => {
			setStage("initialize");
		}, 1000);
	};

	const stageInitialize = () => {
		gsap.timeline()
			.to(".initializeOne", {
				text: "Initializing...",
				duration: 1,
				ease: "none",
			})
			.to(
				".initializeTwo",
				{
					text: "Authentication error",
					duration: 1.25,
					ease: "none",
				},
				"+=2.0"
			)
			.to(
				".initializeThree",
				{
					text: "User input required",
					duration: 1.25,
					ease: "none",
				},
				"+=0.5"
			);
		setTimeout(() => {
			setStage("showNumber");
			setShowNumbers(true);
		}, 7000);
	};

	const stageShowNumber = () => {
		const numbersArray = Array.from(
			{ length: inputs },
			(value, index) => index + 1
		);

		numbersArray.forEach((number) => {
			gsap.timeline({ repeat: -1, repeatRefresh: true }).to(
				`.input${number}`,
				{
					x: () => random(0, 1184, 1),
					y: () => random(0, 624, 1),
					duration: () => random(3, 5),
					ease: "none",
				}
			);
		});

		setTimeout(() => {
			setStage("userInput");
		}, 7000);
	};

	const stageUserInput = () => {
		const numbersArray = Array.from(
			{ length: inputs },
			(value, index) => index + 1
		);

		numbersArray.forEach((number) => {
			const inputDiv = document.getElementsByClassName(
				`input${number}`
			)[0];

			inputDiv.style.cursor = "pointer";
			inputDiv.style.pointerEvents = "auto";
			inputDiv.firstChild.style.display = "none";
		});

		startTimer();
	};

	const stageShutdown = () => {
		setShowNumbers(false);
		if (timerRef.current !== 0) {
			stopTimer();
		}

		const textOne = correct ? "User input accepted" : "User input error";
		const textTwo = correct
			? "Authentication successful"
			: "Shutting down...";

		gsap.timeline()
			.to(".shutdownOne", {
				text: textOne,
				duration: 1.25,
				ease: "none",
			})
			.to(
				".shutdownTwo",
				{
					text: textTwo,
					duration: 1.25,
					ease: "none",
				},
				"+=0.5"
			)
			.to(
				".shutdownOne",
				{
					display: "none",
				},
				"+=0.5"
			)
			.to(
				".shutdownTwo",
				{
					display: "none",
				},
				"-=0.5"
			)
			.to(hackContainer.current, {
				height: "0px",
				duration: 0.2,
			})
			.to(hackWrapper.current, {
				top: null,
				bottom: null,
				duration: 0.2,
			})
			.to(
				hackContainer.current,
				{
					width: "0px",
					duration: 0.2,
				},
				"-=0.1"
			)
			.to(
				hackWrapper.current,
				{
					left: null,
					right: null,
					duration: 0.2,
				},
				"-=0.2"
			)
			.to(hackContainer.current, {
				display: "none",
			})
			.to(
				hackWrapper.current,
				{
					display: "none",
				},
				"-=0.5"
			);
		setTimeout(() => {
			setStage("end");
			setUserInputNum(0);
			setCurrentInputNum(0);
			setCorrect(false);
			setTimerCount(0);
		}, 5000);
	};

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setTimerCount((prev) => prev + 1);
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(timerRef.current);
		timerRef.current = 0;
	};

	const clickInput = (event, number) => {
		setUserInputNum(number);
		event.target.style.opacity = "0.5";
		event.target.style.pointerEvents = "none";
	};

	const renderInputElements = useMemo(() => {
		const numbersArray = Array.from(
			{ length: inputs },
			(value, index) => index + 1
		);

		const bgColors = [
			"bg-sky-200",
			"bg-sky-300",
			"bg-cyan-300",
			"bg-cyan-600",
			"bg-sky-700",
			"bg-sky-800",
			"bg-sky-900",
		];

		return (
			<div className="h-full w-full relative">
				{numbersArray.map((number) => {
					const classes = classNames(
						`input${number}`,
						"absolute flex justify-center items-center w-24 h-24 text-zinc-50 text-4xl font-mono transition-all ease-linear pointer-events-none",
						bgColors[random(0, 5, 1)]
					);

					const startingPoint = {
						transform: `translate(
							${random(0, 1184, 1)}px,
							${random(0, 624, 1)}px
						)`,
					};
					return (
						<div
							key={number}
							className={classes}
							style={startingPoint}
							onClick={(event) => {
								clickInput(event, number);
							}}
						>
							<span>{number}</span>
						</div>
					);
				})}
			</div>
		);
	}, [inputs]);

	return (
		<Layout>
			<div className="pt-20 min-h-screen">
				<div className="container mx-auto px-8 md:px-0 text-center mb-4">
					<h2>VAR Hack Settings</h2>
				</div>

				{/* SETTING SECTION*/}
				<div className="flex flex-wrap justify-center">
					<div className="container mx-auto px-8 md:px-0 leading-8">
						<div className="flex basis-full justify-center items-center my-2">
							<h4>Number of Inputs: </h4>
							<div className="relative ml-4">
								<button
									className={`dropdownButton ${
										showInputMenu ? "show" : ""
									}`}
									onClick={() => {
										toggleShowInputMenu(!showInputMenu);
									}}
								>
									<div className="">{inputs}</div>
									<div className="absolute right-0 w-6">
										<FaChevronDown className="w-6 h-6" />
									</div>
								</button>
								<ul
									ref={inputMenu}
									className={`dropdownMenu ${
										showInputMenu ? "show" : ""
									}`}
								>
									{inputValues.map((value) => {
										return (
											<li
												key={value}
												className="dropdownItem list-none ml-0"
												onClick={() => {
													setInputs(value);
													toggleShowInputMenu(false);
												}}
											>
												{value}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<div className="flex basis-full justify-center items-center my-2">
							<h4>Timer: </h4>
							<div className="relative ml-4">
								<button
									className={`dropdownButton ${
										showTimerMenu ? "show" : ""
									}`}
									onClick={() => {
										toggleShowTimerMenu(!showTimerMenu);
									}}
								>
									<div className="">{timer / 1000}</div>
									<div className="absolute right-0 w-6">
										<FaChevronDown className="w-6 h-6" />
									</div>
								</button>
								<ul
									ref={timerMenu}
									className={`dropdownMenu ${
										showTimerMenu ? "show" : ""
									}`}
								>
									{timerValues.map((value) => {
										return (
											<li
												key={value}
												className="dropdownItem list-none ml-0"
												onClick={() => {
													setTimer(value);
													toggleShowTimerMenu(false);
												}}
											>
												{value / 1000}
											</li>
										);
									})}
								</ul>
							</div>
						</div>
						<div className="flex basis-full justify-center mt-8">
							<div
								onClick={() => setStage("start")}
								className="flex justify-center text-2xl w-36 py-1 bg-slate-800 text-gray-100 rounded cursor-pointer hover:bg-slate-600 hover:text-zinc-50"
							>
								<strong>START</strong>
							</div>
						</div>
					</div>
				</div>

				{/* VAR HACK SECTION*/}
				<div
					ref={hackWrapper}
					className="fixed inset-1/2 bg-black opacity-80 transition-all z-20 hidden"
				></div>
				<div
					ref={hackContainer}
					className="fixed bg-slate-600 border-8 border-zinc-500 w-0 h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 box-content transition-all z-20 hidden"
				>
					{stage === "initialize" && (
						<div className="flex flex-col justify-center items-center h-full text-3xl font-mono">
							<div className="initializeOne text-gray-100"></div>
							<div className="initializeTwo text-gray-100"></div>
							<div className="initializeThree text-gray-100"></div>
						</div>
					)}
					{(stage === "showNumber" || showNumbers) &&
						renderInputElements}
					{stage === "shutdown" && (
						<div className="flex flex-col justify-center items-center h-full text-3xl font-mono">
							<div className="shutdownOne text-gray-100"></div>
							<div className="shutdownTwo text-gray-100"></div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
}
