// TODO: UX(Complete this card for venues etc....)
import { Product } from './Model'
import { Box, Button, HStack, Heading, Text, VStack } from '@components/core'
import { Image } from 'react-native'
import { Dimensions, View, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')
export const CARD_HEIGHT = (width * 1564) / 1600

interface CardProps {
	product: Product
}

const Card = ({
	product: {
		logo,
		cover,
		color1,
		color2,
		title,
		subtitle,
		buttoncta,
		route,
		type,
		primaryTextColor,
		secondaryTextColor,
		buttonColor,
		buttonTextColor,
	},
}: CardProps) => {
	switch (type) {
		case '_ad1':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
					}}
				>
					<VStack
						style={{
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: color1,
							padding: 16,
							justifyContent: 'space-between',
						}}
					>
						<VStack>
							<Heading
								fontSize={'$6xl'}
								fontWeight={'$extrabold'}
								textTransform='uppercase'
								allowFontScaling
								adjustsFontSizeToFit
								textAlign='left'
								sx={{
									lineHeight: 60,
									color: primaryTextColor,
								}}
							>
								{title}
							</Heading>
							<Text
								fontWeight={'$bold'}
								fontSize={'$xl'}
								sx={{
									color: secondaryTextColor,
								}}
							>
								{subtitle}
							</Text>
						</VStack>
						<HStack>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								onPress={() => console.log('route', route)}
								sx={{
									bg: buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: buttonTextColor,
									}}
								>
									{buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)

		case '_ad2':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
					}}
				>
					<View
						style={{
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: color1,
							padding: 16,
							justifyContent: 'space-between',
						}}
					>
						<View>
							<Heading
								fontSize={'$2xl'}
								sx={{
									color: primaryTextColor,
								}}
							>
								{title}
							</Heading>
							<Text
								sx={{
									color: secondaryTextColor,
								}}
							>
								{subtitle}
							</Text>
						</View>
						<Button
							rounded={'$full'}
							w={'auto'}
							alignSelf='center'
							onPress={() => console.log('route', route)}
							sx={{
								bg: buttonColor,
							}}
						>
							<Button.Text
								px={'$2'}
								sx={{
									color: buttonTextColor,
								}}
							>
								{buttoncta}
							</Button.Text>
						</Button>
					</View>
				</Box>
			)
		case '_ad3':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
					}}
				>
					<VStack
						style={{
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: color1,
							padding: 16,
							justifyContent: 'space-between',
						}}
					>
						<VStack>
							<Heading
								bg='$green300'
								fontSize={'$6xl'}
								fontWeight={'$extrabold'}
								textTransform='uppercase'
								// lineHeight={'$6xl'}
								allowFontScaling
								adjustsFontSizeToFit
								textAlign='left'
								sx={{
									lineHeight: 60,
									color: primaryTextColor,
								}}
							>
								{title}
							</Heading>
							<Text
								// bg='$green300'
								fontWeight={'$bold'}
								fontSize={'$xl'}
								sx={{
									color: secondaryTextColor,
								}}
							>
								{subtitle}
							</Text>
						</VStack>
						<HStack>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								onPress={() => console.log('route', route)}
								sx={{
									bg: buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: buttonTextColor,
									}}
								>
									{buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)
		case '_ad4':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
						position: 'relative',
					}}
				>
					<VStack
						style={{
							position: 'relative',
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: color1,
							justifyContent: 'space-between',
							overflow: 'hidden',
						}}
					>
						<Image source={cover} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
						<HStack
							position='absolute'
							left={0}
							right={0}
							bottom={0}
							justifyContent='space-around'
							py={'$3'}
						>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								zIndex={10}
								onPress={() => console.log('route', route)}
								sx={{
									bg: buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: buttonTextColor,
									}}
								>
									{buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)
		case '_ad5':
			return (
				<Box
					bg={'$transparent'}
					sx={{
						w: width,
						h: CARD_HEIGHT,
						position: 'relative',
					}}
				>
					<VStack
						p={'$3'}
						style={{
							position: 'relative',
							borderRadius: 16,
							margin: 19,
							flex: 1,
							backgroundColor: color1,
							justifyContent: 'space-between',
							alignItems: 'center',
							overflow: 'hidden',
						}}
					>
						<Image
							source={logo}
							resizeMode='cover'
							style={{ width: 150, height: 150, borderRadius: 15 }}
						/>
						<Heading
							fontSize={'$2xl'}
							fontWeight={'$extrabold'}
							textTransform='uppercase'
							// lineHeight={'$6xl'}
							allowFontScaling
							adjustsFontSizeToFit
							textAlign='center'
							sx={{
								color: primaryTextColor,
							}}
						>
							{title}
						</Heading>
						<Text
							// bg='$green300'
							fontSize={'$lg'}
							sx={{
								color: secondaryTextColor,
							}}
						>
							{subtitle}
						</Text>
						<HStack
							// position='absolute'
							// left={0}
							// right={0}
							// bottom={0}
							justifyContent='space-around'
							py={'$3'}
						>
							<Button
								rounded={'$full'}
								w={'auto'}
								alignSelf='center'
								zIndex={10}
								onPress={() => console.log('route', route)}
								sx={{
									bg: buttonColor,
								}}
							>
								<Button.Text
									px={'$2'}
									sx={{
										color: buttonTextColor,
									}}
								>
									{buttoncta}
								</Button.Text>
							</Button>
						</HStack>
					</VStack>
				</Box>
			)
	}
}

export default Card
