import { useReactiveVar } from '@apollo/client'
import { ContactsReactiveVar, PermissionContactsReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import * as Contacts from 'expo-contacts'
import { useRouter } from 'expo-router'
import { Heading, Box, Button, Text, VStack } from 'native-base'
import { useEffect, useState } from 'react'

export default () => {
	const rContactsVar = useReactiveVar(ContactsReactiveVar)
	const rPermissionContactsVar = useReactiveVar(PermissionContactsReactiveVar)
	const router = useRouter()

	useEffect(() => {
		async function getContacts() {
			if (rPermissionContactsVar?.granted) {
				const { data } = await Contacts.getContactsAsync()
				if (data.length) {
					console.log('🚀 ~ file: contact.tsx:16 ~ getContacts ~ data:', data)
					ContactsReactiveVar(data)
				}
			}
		}
		getContacts()
	}, [])

	if (!rPermissionContactsVar?.granted) {
		return (
			<Box safeArea flex={1} mx={2}>
        <VStack space={3} mb={6} alignItems={'center'}>
				<Heading>All Contacts</Heading>
				<Text fontSize={'lg'}>Please allow Barfriends to access your contacts.</Text>
        </VStack>
				<Button
					onPress={() =>
						router.push({
							pathname: '(app)/permission/contacts',
						})
					}
				>
					Continue
				</Button>
			</Box>
		)
	}
	if (!rContactsVar?.length) {
		return (
			<Box bg={'red.400'}>
				<Heading>!Contacts</Heading>
			</Box>
		)
	}

	return (
		<Box bg={'red.400'}>
			<Box bg={'red.400'}>
				<Heading>Contacts</Heading>
			</Box>
			<FlashList
				data={[]}
				numColumns={2}
				renderItem={() => {
					return (
						<Box bg={'red.400'}>
							<Heading>HELLO</Heading>
						</Box>
					)
				}}
				showsVerticalScrollIndicator={false}
				estimatedItemSize={20}
				keyExtractor={item => item}
			/>
		</Box>
	)
}
