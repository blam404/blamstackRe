const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage } = actions;

	// Define a template for blog post
	const blogTemplate = path.resolve("./src/templates/blogTemplate.js");
	const blogListTemplate = path.resolve(
		"./src/templates/blogListTemplate.js"
	);

	const result = await graphql(
		`
			{
				projects: allContentfulBlog(
					filter: { category: { eq: "project" } }
					sort: { fields: [publishedDate, createdAt], order: DESC }
				) {
					nodes {
						id: contentful_id
						title
						createdAt(formatString: "MMMM D, YYYY")
						publishedDate(formatString: "MMMM D, YYYY")
						stack
						excerpt {
							internal {
								content
							}
						}
						coverPhoto {
							gatsbyImageData(
								layout: FULL_WIDTH
								placeholder: BLURRED
								width: 768
								resizingBehavior: FILL
							)
						}
						body {
							raw
							references {
								... on ContentfulAsset {
									contentful_id
									__typename
									gatsbyImageData(
										layout: FULL_WIDTH
										placeholder: BLURRED
										width: 768
										resizingBehavior: FILL
									)
									description
								}
							}
						}
					}
				}
				blog: allContentfulBlog(
					filter: { category: { eq: "blog" } }
					sort: { fields: [publishedDate, createdAt], order: DESC }
				) {
					nodes {
						id: contentful_id
						title
						createdAt(formatString: "MMMM D, YYYY")
						publishedDate(formatString: "MMMM D, YYYY")
						excerpt {
							internal {
								content
							}
						}
						coverPhoto {
							gatsbyImageData(
								layout: FULL_WIDTH
								placeholder: BLURRED
								width: 768
								resizingBehavior: FILL
							)
						}
						body {
							raw
							references {
								... on ContentfulAsset {
									contentful_id
									__typename
									gatsbyImageData(
										layout: FULL_WIDTH
										placeholder: BLURRED
										width: 768
										resizingBehavior: FILL
									)
									description
								}
							}
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

	const blog = result.data.blog.nodes;
	const projects = result.data.projects.nodes;

	// Create blog posts pages
	// But only if there's at least one blog post found in Contentful
	// `context` is available in the template as a prop and as a variable in GraphQL

	if (blog.length > 0) {
		blog.forEach((post) => {
			createPage({
				path: `/blog/${post.id}/`,
				component: blogTemplate,
				context: {
					title: post.title,
					publishedDate: post.publishedDate || post.createdAt,
					coverPhoto: post.coverPhoto,
					body: post.body,
				},
			});
		});
	}
	if (projects.length > 0) {
		projects.forEach((post) => {
			createPage({
				path: `/project/${post.id}/`,
				component: blogTemplate,
				context: {
					title: post.title,
					publishedDate: post.publishedDate || post.createdAt,
					coverPhoto: post.coverPhoto,
					body: post.body,
				},
			});
		});
	}

	createPage({
		path: "/blog",
		component: blogListTemplate,
		context: {
			posts: blog,
			category: "blog",
		},
	});

	createPage({
		path: "/project",
		component: blogListTemplate,
		context: {
			posts: projects,
			category: "project",
		},
	});
};
