import RNEButtonPrimary from '@components/atoms/buttons/rnebutton/barfriends/RNEButtonPrimary'

type Props = {
	onPress: () => void
}

export default function PermissionButton(props: Props) {
	return (
		<RNEButtonPrimary
			title={'Continue'}
			type='solid'
			onPress={props.onPress}
			containerStyle={{
				marginTop: 15,
				width: '85%',
			}}
			titleStyle={{
				fontWeight: 'bold',
				textTransform: 'uppercase',
			}}
		/>
	)
}
