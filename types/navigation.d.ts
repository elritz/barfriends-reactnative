import { RootNavigatorParamList } from '@ctypes/preferences'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootNavigatorParamList {}
	}
}
