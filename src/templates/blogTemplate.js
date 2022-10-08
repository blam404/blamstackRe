import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../components/layout";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function BlogTemplate({ pageContext }) {
	const { body, coverPhoto, publishedDate, title, github, website } =
		pageContext;

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
						<p className="text-slate-400 text-2xl mb-0">
							{publishedDate}
						</p>
						{(github || website) && (
							<div className="flex items-center justify-center mt-2">
								{github && (
									<div className="mx-2">
										<a
											href={github}
											target="_blank"
											rel="noopener noreferrer"
										>
											<FaGithub className="h-5 w-5 text-slate-400" />
										</a>
									</div>
								)}
								{website && (
									<div className="mx-2">
										<a
											href={website}
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
						className="overflow-y-hidden w-4/5 mt-4"
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
