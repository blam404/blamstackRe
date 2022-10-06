import React from "react";
import { Link, graphql } from "gatsby";
import get from "lodash/get";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import readingTime from "reading-time";

import Layout from "../components/layout";

export default function BlogTemplate(props) {
	return (
		<div>
			<p>This is a post template</p>
		</div>
	);
}
