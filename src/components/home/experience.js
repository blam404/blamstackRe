import React from "react";

export default function Experience() {
	return (
		<div className="w-4/5">
			<div className="flex items center text-2xl mb-6">
				<h2 className="mr-4">
					<strong>Professional Experiences</strong>
				</h2>
				<hr className="w-52 border-t border-slate-800 my-3.5" />
			</div>
			<div className="flex">
				<div className="text-lg w-1/5">
					<strong>Learnswell</strong>
				</div>
				<div className="w-4/5">
					<div className="mb-4">
						<h3 className="text-xl">Junior Web Developer</h3>
						<p className="text-base text-slate-400">
							September 2019 - January 2022
						</p>
						<ul>
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
						<h3 className="text-xl">
							Quality Assurance Specialist
						</h3>
						<p className="text-base text-slate-400">
							November 2017 - September 2019
						</p>
						<ul>
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
