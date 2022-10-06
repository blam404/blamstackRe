require("dotenv").config({
	path: `.env`,
});

module.exports = {
	siteMetadata: {
		title: "Ben Lam Dev Site",
		description: "Portfolio and Blog site for Ben Lam",
	},
	plugins: [
		"gatsby-plugin-image",
		"gatsby-plugin-postcss",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sass",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-contentful",
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_DELIVERY,
				host: process.env.CONTENTFUL_HOST,
			},
		},
	],
};
