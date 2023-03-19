import { useReactiveVar } from '@apollo/client'
import { PermissionNotificationReactiveVar } from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useRouter } from 'expo-router'
import { Button } from 'native-base'

export default function SearchAreaLocationPermissionButton() {
	const router = useRouter()
	const rPermissionNotificationVar = useReactiveVar(PermissionNotificationReactiveVar)

	return (
		<Button
			variant='solid'
			onPress={async () =>
				rPermissionNotificationVar?.granted
					? await useSetSearchAreaWithLocation()
					: router.push({
							pathname: '(app)/permission/notifications',
					  })
			}
			mt={15}
			w={'85%'}
			_text={{
				fontSize: 'lg',
				fontWeight: 'bold',
			}}
		>
			Continue
		</Button>
	)
}
