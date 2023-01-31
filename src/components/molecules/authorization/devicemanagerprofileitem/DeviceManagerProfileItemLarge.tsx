import CompanyCoasterLogoDynamic from '@assets/images/company/CompanyCoasterLogoDynamic'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Profile } from '@graphql/generated'
import { Box, Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { useContext } from 'react'
import { ActivityIndicator } from 'react-native'
import { ThemeContext } from 'styled-components/native'

type ProfileItemType = {
	item: Profile | undefined
	isActive: boolean | undefined
	loading?: boolean
}

const DeviceManagerProfileItemLarge = ({ item, isActive, loading }: ProfileItemType) => {
	const themeContext = useContext(ThemeContext)
	return (
		<Box
			_light={{
				bg: 'light.200',
			}}
			_dark={{
				bg: 'dark.200',
			}}
			key={item?.id}
			flex={1}
			flexDir={'row'}
			my={2}
			w={'100%'}
			py={3}
			px={3}
			borderRadius={'lg'}
			alignItems={'center'}
			justifyContent={'space-between'}
		>
			<HStack alignItems={'center'}>
				{item?.photos.length ? (
					<Image
						source={{ uri: item?.photos[0].url }}
						style={{ width: 40, height: 40 }}
						minW={40}
						minH={40}
						borderRadius={'lg'}
						alt={'Profile photo'}
					/>
				) : (
					<CompanyCoasterLogoDynamic
						width={40}
						height={40}
						iconColor={
							themeContext.theme === 'light'
								? themeContext.palette.company.soft.primary
								: themeContext.palette.company.soft.primary
						}
						backgroundColor={
							themeContext.theme === 'light'
								? themeContext.palette.company.soft.secondary
								: themeContext.palette.company.soft.secondary
						}
					/>
				)}
				<VStack mx={2}>
					<Text fontSize={'lg'} numberOfLines={1} isTruncated>
						{item?.IdentifiableInformation?.fullname}
					</Text>
					<Heading fontSize={'sm'} isTruncated>
						{item?.IdentifiableInformation?.username}
					</Heading>
				</VStack>
			</HStack>
			{!loading ? (
				<>
					{isActive ? (
						<Icon name='ios-checkmark-circle' as={Ionicons} color={'success.600'} size={'xl'} />
					) : (
						<Icon name='radio-button-unchecked' as={MaterialIcons} color={'gray.400'} size={'xl'} />
					)}
				</>
			) : (
				<ActivityIndicator />
			)}
		</Box>
	)
}

export default DeviceManagerProfileItemLarge
