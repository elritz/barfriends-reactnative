import { FontAwesome5 } from '@expo/vector-icons'
import { Icon, Heading, IconButton, Box } from 'native-base'

interface AddRelationshipProps {}

const AddRelationship = ({}) => {
	return (
		<Box
			flex={1}
			h={200}
			justifyContent={'center'}
			alignItems={'center'}
			rounded='lg'
			_light={{
				bg: 'light.100',
			}}
			_dark={{
				bg: 'dark.100',
			}}
			px={5}
		>
			<IconButton
				disabled={true}
				variant={'solid'}
				borderRadius={'md'}
				bg={'amber.200'}
				icon={<Icon size={30} color={'darkBlue.800'} as={FontAwesome5} name='hand-holding-heart' />}
				height={57}
				width={57}
				borderColor={'primary.500'}
				borderWidth={3}
			/>
			<Heading
				mt={3}
				textAlign={'center'}
				fontSize={'lg'}
				fontWeight={'bold'}
				style={{ textTransform: 'uppercase' }}
			>
				Add a
			</Heading>
			<Heading
				textAlign={'center'}
				fontSize={'lg'}
				fontWeight={'bold'}
				style={{ textTransform: 'uppercase' }}
			>
				relationship
			</Heading>
		</Box>
	)
}

export default AddRelationship
