import React from "react";

import Layout from "../components/layout";
import PostListing from "../components/postListing";

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
					<div className="my-8 w-4/5">
						<PostListing posts={posts} category={category} />
					</div>
				</div>
			</div>
		</Layout>
	);
}
