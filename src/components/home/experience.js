import React from "react";

export default function Experience() {
	return (
		<div className="w-4/5">
			<div className="flex text-lg md:text-xl lg:text-2xl mb-6">
				<h2 className="mr-4">
					<strong>Professional Experiences</strong>
				</h2>
				<hr className="w-12 sm:w-48 md:w-60 border-t border-slate-800 my-auto" />
			</div>
			<div className="flex flex-wrap">
				<div className="md:text-lg lg:text-xl w-full lg:w-1/5">
					<strong>Learnswell</strong>
				</div>
				<div className="w-full lg:w-4/5">
					<div className="mb-4">
						<h3 className="md:text-lg lg:text-xl">
							Junior Web Developer
						</h3>
						<p className="text-sm md:text-base lg:text-lg text-slate-400">
							September 2019 - January 2022
						</p>
						<ul className="text-sm md:text-base lg:text-lg">
							<li>
								Implemented frontend redesign for a client's
								custom eLearning website
							</li>
							<li>
								Implemented frontend design for the company’s
								eLearning platform
							</li>
							<li>
								Implemented logic to traverse through questions,
								lessons, and courses for the company's eLearning
								platform
							</li>
						</ul>
					</div>
					<div>
						<h3 className="md:text-lg lg:text-xl">
							Quality Assurance Specialist
						</h3>
						<p className="text-sm md:text-base lg:text-lg text-slate-400">
							November 2017 - September 2019
						</p>
						<ul className="text-sm md:text-base lg:text-lg">
							<li>
								Tested websites for bugs and submitted tickets
								for devs
							</li>
							<li>
								Created automated testing scripts using Headless
								Chrome and Puppeteer
							</li>
							<li>
								Proposed and created website UI and UX for the
								dev team to implement
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
