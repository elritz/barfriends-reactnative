// export default STORYBOOK_START ? require('./storybook').default : require('./src/index').default
import * as Sentry from 'sentry-expo'

const STORYBOOK_START = false

Sentry.init({
	dsn: 'https://7b8b245cc82549e7b48f1b9a17b0981e@o4504095880118272.ingest.sentry.io/4504095883460608',
	enableInExpoDevelopment: true,
	debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
})

export default require('./src/index').default
