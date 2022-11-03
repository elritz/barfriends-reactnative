// export default STORYBOOK_START ? require('./storybook').default : require('./src/index').default
// import * as Sentry from 'sentry-expo'

const STORYBOOK_START = false

// Sentry.init({
// 	dsn: 'https://dd97920eeec34856af296a809960a8ab@o4504095880118272.ingest.sentry.io/4504095974817792',
// 	tracesSampleRate: 0.1,
// 	enableNative: false,
// 	enableInExpoDevelopment: true,
// 	debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
// })

export default require('./src/index').default
// export default Sentry.Native.wrap(require('./src/index').default)
