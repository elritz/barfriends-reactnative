import { RootNavigatorParamList } from '@ctypes/app'

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootNavigatorParamList {}
	}
}
