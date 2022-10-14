import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

import Layout from "../../../components/layout";

import { FaChevronDown } from "react-icons/fa";

import "../../../styles/hacks.scss";

gsap.registerPlugin(TextPlugin);
const { random } = gsap.utils;
const { shuffle } = gsap.utils;

const shapes = ["circle", "rectangle", "square", "triangle"];
const colors = ["black", "blue", "green", "orange", "purple", "red", "white"];
const colorsTailwind = {
	black: "black",
	blue: "blue-600",
	green: "green-600",
	orange: "orange-400",
	purple: "purple-800",
	red: "red-600",
	white: "white",
};
const distractorDetails = [
	"backgroundColor",
	"colorText",
	"numberColor",
	"shape",
	"shapeColor",
	"shapeText",
	"textBackgroundColor",
];

const BankHack = () => {
	// SETTING SECTION
	const inputMenu = useRef();
	const [inputs, setInputs] = useState(4);
	const [showInputMenu, toggleShowInputMenu] = useState(false);
	const inputValues = [4, 5, 6, 7, 8, 9, 10];

	const distractorMenu = useRef();
	const [distractors, setDistractors] = useState(4);
	const [showDistractorMenu, toggleShowDistractorMenu] = useState(false);
	const distractorValues = [4, 5, 6];

	const timerMenu = useRef();
	const [timer, setTimer] = useState(7000);
	const [showTimerMenu, toggleShowTimerMenu] = useState(false);
	const timerValues = [7000, 8000, 9000, 10000, 11000, 12000, "None"];
	const timerRef = useRef();

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

	const handleClickOutsideDistractor = (event) => {
		if (
			distractorMenu.current &&
			!distractorMenu.current.contains(event.target)
		) {
			toggleShowDistractorMenu(false);
		}
		console.log("3");
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
		} else if (showDistractorMenu) {
			document.addEventListener(
				"mousedown",
				handleClickOutsideDistractor
			);
			return () => {
				document.removeEventListener(
					"mousedown",
					handleClickOutsideDistractor
				);
			};
		}
	}, [showInputMenu, showTimerMenu, showDistractorMenu]);

	// BANK HACK SECTION
	const hackContainer = useRef();
	const hackWrapper = useRef();
	const answerChart = useRef();
	const question = useRef();
	const answer = useRef();
	const order = useRef();
	const timerBar = useRef();

	// stages: start, initialize, showNumber, userInput, shutdown, end
	const [stage, setStage] = useState("end");
	const [correct, setCorrect] = useState(false);
	const [correctCount, setCorrectCount] = useState(0);
	const [timerCount, setTimerCount] = useState(0);

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
		if (timerCount * 1000 === timer) {
			stopTimer();
			setStage("shutdown");
		}
	}, [timerCount]);

	useEffect(() => {
		if (correctCount === inputs) {
			setCorrect(true);
			setStage("shutdown");
		} else if (correctCount !== inputs && stage === "userInput") {
			generateAnswerChart();
			generateQuestionAnswer();
			resetTimer();
			setStage("showNumber");
		}
	}, [correctCount]);

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
					width:
						distractors === 4
							? 1280
							: distractors === 5
							? 1600
							: 1900,
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
			generateAnswerChart();
			generateQuestionAnswer();
			setStage("initialize");
		}, 1000);
	};

	const stageInitialize = () => {
		gsap.timeline()
			.to(".initializeOne", {
				text: "Booting up...",
				duration: 1,
				ease: "none",
			})
			.to(
				".initializeOne",
				{
					text: "",
					duration: 0,
				},
				"+=1"
			)
			.to(".initializeOne", {
				text: "Doing hackerman stuff...",
				duration: 1.2,
				ease: "none",
			})
			.to(
				".initializeOne",
				{
					text: "",
					duration: 0,
				},
				"+=1"
			)
			.to(".initializeOne", {
				text: "Access code flagged; human captcha input required.",
				duration: 2,
				ease: "none",
			});
		setTimeout(() => {
			setStage("showNumber");
		}, 7200);
	};

	const stageShowNumber = () => {
		setTimeout(() => {
			gsap.to(".distractor", {
				fontSize: 0,
				duration: 2.5,
			});
		}, 1000);

		setTimeout(() => {
			setStage("userInput");
		}, 3500);
	};

	const stageUserInput = () => {
		document.getElementsByTagName("input")[0].focus();
		if (typeof timer === "number") {
			startTimer();
		}
		// create animation for timer bar
		if (typeof timer === "number") {
			gsap.timeline().to(timerBar.current, {
				width: 0,
				ease: "none",
				duration: timer / 1000,
			});
		}
	};

	const stageShutdown = () => {
		if (timerRef.current !== 0 && typeof timer === "number") {
			stopTimer();
		}

		const textOne = correct
			? "User input accepted"
			: "Captcha not accepted";
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
			setCorrect(false);
			setCorrectCount(0);
			setTimerCount(0);
		}, 5000);
	};

	const generateAnswerChart = () => {
		const answerObject = {};

		const numbersArray = Array.from(
			{ length: distractors },
			(value, index) => index + 1
		);

		const secondNumber = Array.from(
			{ length: distractors },
			(value, index) => index + 1
		);

		shuffle(secondNumber);

		numbersArray.forEach((number) => {
			const bgColor = random(colors);
			const numberColor = random(colors);
			let textBackgroundColor = random(colors);
			let shapeColor = random(colors);

			do {
				shapeColor = random(colors);
			} while (shapeColor === bgColor || shapeColor === numberColor);

			do {
				textBackgroundColor = random(colors);
			} while (
				textBackgroundColor === bgColor ||
				textBackgroundColor === shapeColor
			);

			const details = {
				backgroundColor: bgColor,
				colorText: random(colors),
				number: number,
				numberColor: numberColor,
				secondNumber: secondNumber[number - 1],
				shape: random(shapes),
				shapeColor: shapeColor,
				shapeText: random(shapes),
				textBackgroundColor: textBackgroundColor,
			};

			answerObject[number] = details;
		});

		answerChart.current = answerObject;
	};

	const generateQuestionAnswer = () => {
		// generate the captcha question
		const firstDetail = random(distractorDetails);
		const firstDistractor = random(1, distractors, 1);
		const secondDetail = random(distractorDetails);
		let secondDistractor = random(1, distractors, 1);

		do {
			secondDistractor = random(1, distractors, 1);
		} while (secondDistractor === firstDistractor);

		question.current = {
			1: {
				detail: firstDetail.replace(/([A-Z])/g, " $1"),
				distractor: firstDistractor,
			},
			2: {
				detail: secondDetail.replace(/([A-Z])/g, " $1"),
				distractor: secondDistractor,
			},
		};

		// get answer to captcha
		const firstAnswer = answerChart.current[firstDistractor][firstDetail];
		const secondAnswer =
			answerChart.current[secondDistractor][secondDetail];
		answer.current = `${firstAnswer} ${secondAnswer}`;

		// generate the order for the distractors
		const randomOrder = Array.from(
			{ length: distractors },
			(value, index) => index + 1
		);

		order.current = shuffle(randomOrder);
	};

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setTimerCount((prev) => prev + 1);
		}, 1000);
	};

	const resetTimer = () => {
		clearInterval(timerRef.current);
		setTimerCount(0);
	};

	const stopTimer = () => {
		clearInterval(timerRef.current);
		timerRef.current = 0;
	};

	const renderHack = () => {
		return (
			<div className="py-8 flex justify-center h-full font-sans relative">
				{/* 
					need to "activate" classnames or it won't work due to weird tailwind and react rendering thing
				*/}
				<div className="text-black text-white text-blue-600 text-green-600 text-orange-400 text-purple-800 text-red-600 bg-black bg-white bg-blue-600 bg-green-600 bg-orange-400 bg-purple-800 bg-red-600"></div>
				<div className="flex justify-center">
					{order.current.map((number) => {
						const details = answerChart.current[number];

						return (
							<div key={`distractor-${number}`}>
								{stage === "showNumber" && (
									<div
										className="distractor bg-slate-500 text-white text-8xl mx-2.5 flex justify-center items-center"
										style={{ width: 295, height: 295 }}
									>
										<span>{details.number}</span>
									</div>
								)}
								{stage === "userInput" && (
									<div
										className={`bg-${
											colorsTailwind[
												details.backgroundColor
											]
										} mx-2.5 flex justify-center items-center`}
										style={{ width: 295, height: 295 }}
									>
										<div
											className={`${details.shape} bg-${
												colorsTailwind[
													details.shapeColor
												]
											} p-24 relative`}
										>
											<div
												className={`text-${
													colorsTailwind[
														details
															.textBackgroundColor
													]
												} text-2xl absolute top-10 left-1/2 -translate-x-1/2 uppercase`}
											>
												<strong>
													{details.colorText}
												</strong>
											</div>
											<div
												className={`text-${
													colorsTailwind[
														details
															.textBackgroundColor
													]
												} text-2xl absolute bottom-10 left-1/2 -translate-x-1/2 uppercase`}
											>
												<strong>
													{details.shapeText}
												</strong>
											</div>
											<div
												className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-${
													colorsTailwind[
														details.numberColor
													]
												} text-6xl`}
											>
												{details.secondNumber}
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})}
				</div>
				{stage === "userInput" && (
					<div className="absolute bottom-4 my-8 font-sans text-center w-4/5">
						{typeof timer === "number" && (
							<div
								className="my-12 flex justify-center"
								style={{ height: "5px" }}
							>
								<div
									ref={timerBar}
									className="w-full h-full bg-orange-700"
								/>
							</div>
						)}
						<div className="text-gray-100 text-2xl uppercase">
							<strong>{`Enter ${question.current[1].detail} (${question.current[1].distractor}) and ${question.current[2].detail} (${question.current[2].distractor})`}</strong>
						</div>
						<div className="mt-4">
							<input
								type="text"
								className="bg-transparent w-72 text-xl border-b outline-0"
								onKeyDown={checkAnswer}
							/>
						</div>
					</div>
				)}
			</div>
		);
	};

	const checkAnswer = (e) => {
		if (e.key === "Enter") {
			const userAnswer = e.target.value.toLowerCase();

			if (userAnswer === answer.current) {
				setCorrectCount(correctCount + 1);
			} else {
				setStage("shutdown");
			}
		}
	};

	return (
		<Layout>
			<div className="pt-20 min-h-screen">
				<div className="container mx-auto px-8 md:px-0 text-center mb-4">
					<h2>Bank Hack Settings</h2>
				</div>

				{/* SETTING SECTION*/}
				<div className="flex flex-wrap justify-center">
					<div className="container mx-auto px-8 md:px-0 leading-8">
						<div className="flex basis-full justify-center items-center my-2">
							<h4>Number of Captcha Inputs: </h4>
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
										<FaChevronDown />
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
												key={`input-${value}`}
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
							<h4>Number of Distractors: </h4>
							<div className="relative ml-4">
								<button
									className={`dropdownButton ${
										showDistractorMenu ? "show" : ""
									}`}
									onClick={() => {
										toggleShowDistractorMenu(
											!showDistractorMenu
										);
									}}
								>
									<div className="">{distractors}</div>
									<div className="absolute right-0 w-6">
										<FaChevronDown />
									</div>
								</button>
								<ul
									ref={distractorMenu}
									className={`dropdownMenu ${
										showDistractorMenu ? "show" : ""
									}`}
								>
									{distractorValues.map((value) => {
										return (
											<li
												key={`distractor-${value}`}
												className="dropdownItem list-none ml-0"
												onClick={() => {
													setDistractors(value);
													toggleShowDistractorMenu(
														false
													);
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
									<div className="">
										{typeof timer === "number"
											? timer / 1000
											: timer}
									</div>
									<div className="absolute right-0 w-6">
										<FaChevronDown />
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
												key={`timer-${value}`}
												className="dropdownItem list-none ml-0"
												onClick={() => {
													setTimer(value);
													toggleShowTimerMenu(false);
												}}
											>
												{typeof value === "number"
													? value / 1000
													: value}
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

				{/* BANK HACK SECTION*/}
				<div
					ref={hackWrapper}
					className="fixed inset-1/2 bg-black opacity-80 transition-all z-20 hidden"
				></div>
				<div
					ref={hackContainer}
					className="fixed bg-slate-600 border-8 border-zinc-500 w-0 h-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 box-content transition-all z-20 hidden"
				>
					{stage === "initialize" && (
						<div className="flex flex-col text-gray-100 justify-center items-center h-full text-3xl font-mono">
							<div className="initializeOne"></div>
						</div>
					)}
					{(stage === "showNumber" || stage === "userInput") &&
						renderHack()}
					{stage === "shutdown" && (
						<div className="flex flex-col text-gray-100 justify-center items-center h-full text-3xl font-mono">
							<div className="shutdownOne"></div>
							<div className="shutdownTwo"></div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default BankHack;
