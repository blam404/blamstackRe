import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import PostListing from "../postListing";
import useMediaQuery from "../../utils/useMediaQuery";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Projects({ featuredProjects, projects }) {
	const maxWidth = useMediaQuery(1024) && "420px";
	return (
		<div className="w-4/5">
			<div className="flex text-lg md:text-xl lg:text-2xl mb-6">
				<h2 className="mr-4">
					<strong>Things I've Created</strong>
				</h2>
				<hr className="w-24 sm:w-48 md:w-60 border-t border-slate-800 my-auto" />
			</div>
			<div className="flex flex-wrap items-start mb-8 lg:mb-12">
				{featuredProjects.map((project, index) => {
					const stackMargin =
						index % 2 === 1 ? "lg:-ml-2" : "lg:-mr-2";
					const stackJustify =
						index % 2 === 1 ? "lg:justify-start" : "lg:justify-end";
					const infoAlign =
						index % 2 === 1 ? "lg:text-start" : "lg:text-end";

					const image = getImage(project.coverPhoto);
					return (
						<div
							key={project.id}
							className={`flex flex-wrap mb-8 w-full md:w-1/2 lg:w-full px-1 lg:px-0 lg:h-80 lg:items-center relative`}
						>
							<div
								className={`flex flex-wrap w-full z-10 order-2 ${infoAlign} ${stackJustify} ${
									index % 2 === 1
										? "lg:order-1"
										: "lg:order-2"
								}`}
							>
								<h3 className="w-full md:text-lg lg:text-xl mt-2">
									<Link
										to={`/project/${project.id}`}
										className="text-slate-800 no-underline"
									>
										<strong>{project.title}</strong>
									</Link>
								</h3>
								<p className="w-full text-sm md:text-base text-slate-400 mb-0">
									{project.publishedDate || project.createdAt}
								</p>
								<div className="w-full lg:w-2/3 lg:bg-blue-400 lg:px-6 lg:py-4 lg:mt-2 lg:rounded">
									<p className="mb-0">
										{project.excerpt.internal.content}
									</p>
								</div>
								<div
									className={`w-full flex lg:mt-2 -ml-2 ${stackMargin} ${stackJustify}`}
								>
									{project.stack.map((item, index) => (
										<div
											key={`featured stack item ${index}`}
											className="text-sm text-slate-400 mx-2"
										>
											{item}
										</div>
									))}
								</div>
								{(project.github || project.website) && (
									<div
										className={`w-full flex items-center lg:mt-2 -ml-2 text-slate-400 ${stackMargin} ${stackJustify}`}
									>
										{project.github && (
											<div className="mx-2">
												<a
													href={project.github}
													target="_blank"
													rel="noopener noreferrer"
												>
													<FaGithub className="h-5 w-5 text-slate-400" />
												</a>
											</div>
										)}
										{project.website && (
											<div className="mx-2">
												<a
													href={project.website}
													target="_blank"
													rel="noopener noreferrer"
												>
													<FaExternalLinkAlt className="h-4 w-4 text-slate-400" />
												</a>
											</div>
										)}
									</div>
								)}
							</div>
							<div
								className={`lg:absolute lg:top-0 w-full lg:w-1/2 h-48 md:h-64 lg:h-80 order-1 ${
									index % 2 === 1
										? "lg:order-2 lg:right-0"
										: "lg:order-1 lg:left-0"
								}`}
							>
								<Link to={`/project/${project.id}`}>
									<GatsbyImage
										image={image}
										alt={project.coverPhoto.description}
										style={{
											maxWidth: maxWidth,
										}}
										className={`lg:absolute lg:top-0 w-full h-48 md:h-64 lg:h-80`}
									/>
								</Link>
							</div>
						</div>
					);
				})}
			</div>
			<PostListing posts={projects} category="project" />
		</div>
	);
}
