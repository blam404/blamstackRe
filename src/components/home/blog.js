import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Blog({ blog }) {
	return (
		<div className="w-4/5">
			<div className="flex items center text-2xl mb-6">
				<h2 className="mr-4">
					<strong>Thinking Out Loud</strong>
				</h2>
				<hr className="w-52 border-t border-slate-800 my-3.5" />
			</div>
			<div className="flex flex-wrap mb-12">
				{blog.map((post) => {
					const image = getImage(post.coverPhoto);
					return (
						<div key={post.id} className="w-1/3 px-1">
							<div className="max-h-44 overflow-y-hidden">
								<GatsbyImage
									image={image}
									alt="post cover photo"
								/>
							</div>
							<div>
								<h3 className="text-lg">
									<strong>{post.title}</strong>
								</h3>
								<p className="text-slate-400 mb-0">
									{post.publishedDate || post.createdAt}
								</p>
							</div>
							<div>
								<p className="mb-0">
									{post.excerpt.internal.content}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
