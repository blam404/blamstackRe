import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export default function PostListing({ posts, category }) {
	return (
		<div className="flex items-start flex-wrap mb-12">
			{posts.map((post) => {
				const image = getImage(post.coverPhoto);
				return (
					<div
						key={post.id}
						className="w-full md:w-1/2 lg:w-1/3 md:px-1 mb-8"
					>
						<div className="max-h-60 overflow-y-hidden">
							<Link to={`/${category}/${post.id}`}>
								<GatsbyImage
									image={image}
									alt={post.coverPhoto.description}
									className="w-full h-60 md:h-48"
								/>
							</Link>
						</div>
						<div>
							<h3 className="md:text-lg lg:text-xl mt-2">
								<Link
									to={`/${category}/${post.id}`}
									className="text-slate-800 no-underline"
								>
									<strong>{post.title}</strong>
								</Link>
							</h3>
							<p className="text-sm md:text-base text-slate-400 mb-0">
								{post.publishedDate || post.createdAt}
							</p>
						</div>
						<div className="text-sm md:text-base">
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
	);
}
