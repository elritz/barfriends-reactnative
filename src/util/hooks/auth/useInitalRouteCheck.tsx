import { authorizationParseToken } from './useAuthorizationToken'
import { AUTHORIZATION, DEVICE_TOKEN } from '@constants/StorageConstants'
import { MeReactiveVar } from '@reactive'
import { secureStorageItemDelete } from '@util/hooks/local/useSecureStorage'
import { useEffect } from 'react'

const useInitalRouteCheck = async () => {
	// const { state: appState, dispatch: appDispatch } = useContext(AppContext);
	const rMeReactiveVar = MeReactiveVar()

	// const [meQuery, { data, loading, error }] = useMeLazyQuery({
	//   fetchPolicy: 'network-only',
	//   onCompleted: async (data) => {
	//     const { activeprofile } = await authorizationParseToken();
	//     if (data && data.me?.success) {
	//       MeReactiveVar({
	//         activeProfile: activeprofile,
	//         profile: data.me.Profile,
	//       });
	//     }
	//   },
	// });

	const initialAuthCheck = async () => {
		// ? This function deletes the token completely
		// secureStorageItemDelete({ key: DEVICE_TOKEN });
		// ? This fucntion delete the AUTHORIZED CREDENTIALS
		secureStorageItemDelete({ key: AUTHORIZATION })
		// ? This fucntion create the AUTHORIZED CREDENTIALS
		const { activeprofile } = await authorizationParseToken()
		if (!activeprofile) {
		}
		if (!activeprofile?.authorizationToken || !activeprofile.refreshToken) {
		} else {
			// meQuery();
		}
	}

	useEffect(() => {
		initialAuthCheck()
	}, [])

	// return { data, loading, error };
}

export default useInitalRouteCheck
