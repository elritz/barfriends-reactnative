import Constants from 'expo-constants'
import { AppManifest } from 'expo-constants/build/Constants.types'

// interface ReadTokenProps {
//   key: string;
//   decode: boolean;
// }
// interface CreateTokenProps {
//   key: string;
//   value: string;
//   options?: SecureStore.SecureStoreOptions;
// }

const constantInstallationId = (): string => Constants.sessionId

const constantsManifest = (): AppManifest | null => Constants.manifest

export { constantInstallationId, constantsManifest }
