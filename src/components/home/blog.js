import React from "react";

import PostListing from "../postListing";

export default function Blog({ blog }) {
	return (
		<div className="w-4/5">
			<div className="flex text-lg md:text-xl lg:text-2xl mb-6">
				<h2 className="mr-4">
					<strong>Thinking Out Loud</strong>
				</h2>
				<hr className="w-36 sm:w-52 md:w-60 border-t border-slate-800 my-auto" />
			</div>
			<PostListing posts={blog} category="blog" />
		</div>
	);
}
