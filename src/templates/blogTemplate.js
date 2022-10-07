import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";

export default function BlogTemplate({ pageContext }) {
	const { body, coverPhoto, publishedDate, title } = pageContext;

	const image = getImage(coverPhoto);

	const options = {
		renderNode: {
			[INLINES.HYPERLINK]: ({ content, data }) => {
				console.log("data: ", data);
				console.log("content: ", content);
				return (
					<a
						href={data.uri}
						target="_blank"
						rel="noopener noreferrer"
					>
						{content[0].value}
					</a>
				);
			},
			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				const { gatsbyImageData, description } = node.data.target;
				return (
					<GatsbyImage
						image={getImage(gatsbyImageData)}
						alt={description}
						className="mb-2"
					/>
				);
			},
		},
	};

	return (
		<Layout>
			<div className="container mx-auto pt-24 min-h-screen">
				<div className="flex flex-wrap justify-center">
					<div className="w-4/5 text-center">
						<h1 className="text-4xl">{title}</h1>
						<p className="text-slate-400 text-2xl">
							{publishedDate}
						</p>
					</div>
					<div
						className="overflow-y-hidden w-4/5"
						style={{ maxWidth: "768px", maxHeight: "480px" }}
					>
						<GatsbyImage
							image={image}
							alt={coverPhoto.description}
						/>
					</div>
					<div className="w-4/5 text-xl my-8">
						{body?.raw && renderRichText(body, options)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
