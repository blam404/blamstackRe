import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export default function About() {
	return (
		<div className="w-4/5">
			<div className="flex text-lg md:text-xl lg:text-2xl mb-6">
				<h2 className="mr-4">
					<strong>About Me</strong>
				</h2>
				<hr className="w-40 sm:w-52 md:w-60 border-t border-slate-800 my-auto" />
			</div>
			<div className="flex flex-wrap">
				<div className="text-sm md:text-base lg:text-lg w-full md:w-2/3 order-2 md:order-1">
					<p>I'm a creator.</p>
					<p>
						It first started with graphic design in college, but I
						soon realized I'm not good at creating things out of
						nothing. This lead me to photography and videography
						which I still do as a hobby.
					</p>
					<p>
						There are many little things that pushed me towards web
						development such as managaing and designing a company
						newsletter, clumsily customizing a Salesforce CRM for a
						previous employer, and doing QA for a startup.
					</p>
					<p>
						At the startup, I told them I'm interested in becoming a
						dev so they told me to take an online course and they'll
						teach me the rest while working. So after a month of
						online courses, I became a front end developer in
						Septebmer 2019.
					</p>
				</div>
				<div className="w-full md:w-1/3 order-1 md:order-2">
					<div>
						<StaticImage
							src="../../images/profile.jpg"
							className="md:rounded-full overflow-hidden md:m-2 mb-2 md:mb-0"
							alt="profile picture of ben lam"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
