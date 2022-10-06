import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Projects({ featuredProjects, projects }) {
	console.log("featuredProjects: ", projects);
	return (
		<div className="w-4/5">
			<div className="flex items center text-2xl mb-6">
				<h2 className="mr-4">
					<strong>Things I've Created</strong>
				</h2>
				<hr className="w-52 border-t border-slate-800 my-3.5" />
			</div>
			<div className="mb-12">
				{featuredProjects.map((project, index) => {
					const stackMargin = index % 2 === 1 ? "-ml-2" : "-mr-2";
					const stackJustify =
						index % 2 === 1 ? "justify-start" : "justify-end";
					const infoAlign =
						index % 2 === 1 ? "text-start" : "text-end";

					const image = getImage(project.coverPhoto);
					return (
						<div
							key={project.id}
							className="flex mb-8 w-full h-80 items-center relative"
						>
							<div
								className={`w-3/5 z-10 ${infoAlign} ${
									index % 2 === 1 ? "order-1" : "order-2"
								}`}
							>
								<h3 className="text-xl">
									<strong>{project.title}</strong>
								</h3>
								<p className="text-slate-400">
									{project.publishedDate || project.createdAt}
								</p>
								<div className="bg-blue-400 px-6 py-4 mt-4 rounded">
									<p className="mb-0">
										{project.excerpt.internal.content}
									</p>
								</div>
								<div
									className={`flex mt-4 ${stackMargin} ${stackJustify}`}
								>
									{project.stack.map((item) => (
										<div className="text-sm text-slate-400 mx-2">
											{item}
										</div>
									))}
								</div>
							</div>
							<div
								className={`w-2/5 overflow-y-hidden ${
									index % 2 === 1 ? "order-2" : "order-1"
								}`}
							>
								<GatsbyImage
									image={image}
									alt="Project cover photo"
									style={{ width: "420px", height: "320px" }}
									className={`absolute top-0 ${
										index % 2 === 1 ? "right-0" : "left-0"
									}`}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<div className="flex flex-wrap mb-12">
				{projects.map((project) => {
					const image = getImage(project.coverPhoto);
					return (
						<div key={project.id} className="w-1/3 px-1">
							<div className="max-h-44 overflow-y-hidden">
								<GatsbyImage
									image={image}
									alt="Project cover photo"
								/>
							</div>
							<div>
								<h3 className="text-lg">
									<strong>{project.title}</strong>
								</h3>
								<p className="text-slate-400 mb-0">
									{project.publishedDate || project.createdAt}
								</p>
							</div>
							<div>
								<p className="mb-0">
									{project.excerpt.internal.content}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
