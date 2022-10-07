import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import Layout from "../components/layout";

export default function Blog({ pageContext }) {
	const { posts, category } = pageContext;
	return (
		<Layout>
			<div className="container mx-auto pt-24 min-h-screen">
				<div className="flex flex-wrap justify-center">
					<div className="w-4/5 text-center">
						<h1 className="text-4xl">
							{category.charAt(0).toUpperCase() +
								category.slice(1)}
						</h1>
					</div>
					<div className="flex flex-wrap w-4/5 my-8">
						{posts.map((post) => {
							const image = getImage(post.coverPhoto);
							return (
								<div key={post.id} className="w-1/3 px-1 mb-8">
									<div className="max-h-44 overflow-y-hidden">
										<Link to={`/${category}/${post.id}`}>
											<GatsbyImage
												image={image}
												alt={
													post.coverPhoto.description
												}
											/>
										</Link>
									</div>
									<div>
										<h3 className="text-lg">
											<Link
												to={`/${category}/${post.id}`}
												className="text-slate-800 no-underline"
											>
												<strong>{post.title}</strong>
											</Link>
										</h3>
										<p className="text-slate-400 mb-0">
											{post.publishedDate ||
												post.createdAt}
										</p>
									</div>
									<div>
										<p className="mb-0">
											{post.excerpt.internal.content}
										</p>
									</div>
									{post.stack && (
										<div className="flex -ml-2">
											{post.stack.map((item, index) => (
												<div
													key={`regular stack item ${index}`}
													className="text-sm text-slate-400 mx-2"
												>
													{item}
												</div>
											))}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
}
