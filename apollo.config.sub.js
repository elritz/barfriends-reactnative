module.exports = {
	client: {
		includes: [`./src/graphql/DM/**/*.ts`],
		excludes: [
			`./src/graphql/generated/index.ts`,
			`./src/graphql/generated/schema.graphql`,
			`./src/graphql/generated/schema.graphql.json`,
		],
		service: 'barfriends',
		service: {
			name: 'subscriptions',
			// url: 'http://192.168.86.23:5004/graphql/stream',
			url: 'https://localhost:5004/graphql/stream',
		},
	},
}
