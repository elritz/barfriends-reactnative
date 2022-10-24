import { RootNavigatorParamList } from '@types';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootNavigatorParamList { }
	}
}