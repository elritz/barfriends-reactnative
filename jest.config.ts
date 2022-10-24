import type { Config } from '@jest/types'

// Sync object
export default async (): Promise<Config.InitialOptions> => ({
	verbose: true,
})
