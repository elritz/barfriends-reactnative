module.exports = {
	client: {
		includes: [`./src/graphql/DM/**/*.ts`],
		excludes: [
			`./src/graphql/generated/index.ts`,
			`./src/graphql/generated/schema.graphql`,
			`./src/graphql/generated/schema.graphql.json`,
		],
		// service: 'barfriends',
		service: {
			name: 'barfriends',
			url: 'http://192.168.86.23:4000/graphql',
		},
	},
}
