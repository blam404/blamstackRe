const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions;

	// Define a template for blog post
	const blogPost = path.resolve("./src/templates/blogTemplate.js");

	const result = await graphql(
		`
			{
				allContentfulBlog {
					nodes {
						id
						title
						createdAt
						publishedDate
						body {
							raw
						}
					}
				}
			}
		`
	);

	if (result.errors) {
		reporter.panicOnBuild(
			`There was an error loading your Contentful posts`,
			result.errors
		);
		return;
	}

	const posts = result.data.allContentfulBlog.nodes;

	// Create blog posts pages
	// But only if there's at least one blog post found in Contentful
	// `context` is available in the template as a prop and as a variable in GraphQL

	if (posts.length > 0) {
		posts.forEach((post) => {
			createPage({
				path: `/blog/${post.id}/`,
				component: blogPost,
				context: {
					id: post.id,
					title: post.title,
					publishedDate: post.publishedDate || post.createdAt,
					body: post.body,
				},
			});
		});
	}
};
