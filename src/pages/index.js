import React from "react";
import { graphql } from "gatsby";

import About from "../components/home/about";
import Blog from "../components/home/blog";
import Experience from "../components/home/experience";
import Layout from "../components/layout";
import Projects from "../components/home/projects";

export default function HomePage(props) {
	const blog = props.data.blog.nodes;
	const featuredProjects = props.data.featuredProjects.nodes;
	const projects = props.data.projects.nodes;

	return (
		<Layout>
			<div className="flex flex-wrap justify-center container mx-auto">
				{/* INTRO */}
				<div className="w-full min-h-screen flex justify-center items-center">
					<div className="w-4/5">
						<p className="text-xl">Hey! I'm</p>
						<p className="text-5xl">
							<strong>Ben Lam</strong>
						</p>
						<p className="text-5xl">
							<strong>I create things for the internet</strong>
						</p>
						<div className="w-1/2">
							<p className="text-xl">
								My focus is on the front end since I love to
								create an engaging web experience for the user.
								I've been working as a web developer since 2019,
								but I still think there is still so much to
								learn since the user experience is always
								changing.
							</p>
						</div>
					</div>
				</div>
				{/* ABOUT */}
				<div
					id="about"
					className="w-full min-h-screen flex justify-center items-center xl:w-4/5"
				>
					<About />
				</div>
				{/* EXPERIENCE */}
				<div
					id="experience"
					className="w-full min-h-screen flex justify-center items-center xl:w-4/5"
				>
					<Experience />
				</div>
				{/* PROJECTS */}
				<div
					id="projects"
					className="w-full min-h-screen flex justify-center items-center xl:w-4/5 pt-20"
				>
					<Projects
						featuredProjects={featuredProjects}
						projects={projects}
					/>
				</div>
				{/* BLOG */}
				<div
					id="blog"
					className="w-full min-h-screen flex justify-center items-center xl:w-4/5 pt-20"
				>
					<Blog blog={blog} />
				</div>
				{/* CONTACT? */}
			</div>
		</Layout>
	);
}

export const pageQuery = graphql`
	query HomeQuery {
		featuredProjects: allContentfulBlog(
			filter: { category: { eq: "project" }, featured: { eq: true } }
			limit: 3
			sort: { fields: [publishedDate, createdAt], order: DESC }
		) {
			nodes {
				id: contentful_id
				title
				createdAt(formatString: "MMMM D, YYYY")
				publishedDate(formatString: "MMMM D, YYYY")
				stack
				excerpt {
					internal {
						content
					}
				}
				coverPhoto {
					description
					gatsbyImageData(
						layout: FULL_WIDTH
						placeholder: BLURRED
						width: 600
						resizingBehavior: FILL
					)
				}
			}
		}
		projects: allContentfulBlog(
			filter: { category: { eq: "project" }, featured: { eq: false } }
			limit: 6
			sort: { fields: [publishedDate, createdAt], order: DESC }
		) {
			nodes {
				id: contentful_id
				title
				createdAt(formatString: "MMMM D, YYYY")
				publishedDate(formatString: "MMMM D, YYYY")
				stack
				excerpt {
					internal {
						content
					}
				}
				coverPhoto {
					description
					gatsbyImageData(
						layout: FULL_WIDTH
						placeholder: BLURRED
						width: 600
						resizingBehavior: FILL
					)
				}
			}
		}
		blog: allContentfulBlog(
			filter: { category: { eq: "blog" } }
			limit: 3
			sort: { fields: [publishedDate, createdAt], order: DESC }
		) {
			nodes {
				id: contentful_id
				title
				createdAt(formatString: "MMMM D, YYYY")
				publishedDate(formatString: "MMMM D, YYYY")
				excerpt {
					internal {
						content
					}
				}
				coverPhoto {
					description
					gatsbyImageData(
						layout: FULL_WIDTH
						placeholder: BLURRED
						width: 600
						resizingBehavior: FILL
					)
				}
			}
		}
	}
`;
