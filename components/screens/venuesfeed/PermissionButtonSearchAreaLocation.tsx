import { useReactiveVar } from '@apollo/client'
import { PermissionForegroundLocationReactiveVar } from '@reactive'
import useSetSearchAreaWithLocation from '@util/hooks/searcharea/useSetSearchAreaWithLocation'
import { useRouter } from 'expo-router'
import { Button } from 'native-base'

export default function PermissionButtonSearchAreaLocation() {
	const route = useRouter()
	const rPermissionLocationVar = useReactiveVar(PermissionForegroundLocationReactiveVar)

	const handleLocationPermissionNavigation = async () => {
		route.push({
			pathname: '(app)/permission/foregroundlocation',
		})
	}

	return (
		<Button
			variant='solid'
			onPress={async () =>
				rPermissionLocationVar?.granted
					? await useSetSearchAreaWithLocation()
					: await handleLocationPermissionNavigation()
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
