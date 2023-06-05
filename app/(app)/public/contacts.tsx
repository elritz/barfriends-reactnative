import { useReactiveVar } from '@apollo/client'
import { ContactsReactiveVar, PermissionContactsReactiveVar } from '@reactive'
import { FlashList } from '@shopify/flash-list'
import * as Contacts from 'expo-contacts'
import { useRouter } from 'expo-router'
import { Heading, Box, Button, Text, VStack, HStack } from 'native-base'
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
					console.log('🚀 ~ file: contact.tsx:16 ~ getContacts ~ data:', JSON.stringify(data, null, 4))
					ContactsReactiveVar(data)
				}
			}
		}
		getContacts()
	}, [])

	//   {
	//     "emails": [
	//         {
	//             "email": "borasumer@outlook.com",
	//             "label": "home",
	//             "id": "8C9ECEC8-1E2E-487C-86B4-868C23C9E85F"
	//         }
	//     ],
	//     "imageAvailable": true,
	//     "firstName": "Bora",
	//     "id": "DAB47BC6-0C67-4450-94EB-9B5F12174BC0:ABPerson",
	//     "company": "Freelance Developer",
	//     "rawImage": {
	//         "uri": "file:///var/mobile/Containers/Data/Application/6874190E-0F68-4253-B484-4ED77C91E9B3/Library/Caches/Contacts/DAB47BC6-0C67-4450-94EB-9B5F12174BC0:ABPerson-imageData.png",
	//         "width": 3024,
	//         "height": 4032
	//     },
	//     "image": {
	//         "uri": "file:///var/mobile/Containers/Data/Application/6874190E-0F68-4253-B484-4ED77C91E9B3/Library/Caches/Contacts/DAB47BC6-0C67-4450-94EB-9B5F12174BC0:ABPerson-thumbnailImageData.png",
	//         "width": 346,
	//         "height": 347
	//     },
	//     "phoneNumbers": [
	//         {
	//             "countryCode": "ca",
	//             "number": "(705) 500-6918",
	//             "digits": "7055006918",
	//             "id": "21E94987-A298-4D49-B432-BE0EE677E164",
	//             "label": "mobile"
	//         }
	//     ],
	//     "contactType": "person",
	//     "name": "Bora Sumer",
	//     "lastName": "Sumer"
	// },

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
		<Box flex={1} bg={'red.400'}>
			<Box bg={'red.400'}>
				<Heading>Contacts</Heading>
			</Box>
			<FlashList
				data={rContactsVar}
				numColumns={2}
				renderItem={({ item }) => {
					return (
						<Box bg={'red.400'}>
							<HStack>
								<VStack>
									<Text>{item.firstName}</Text>
									<Text>{item.lastName}</Text>
								</VStack>
								<HStack>
									<Button>Add</Button>
									<Button>select</Button>
								</HStack>
							</HStack>
						</Box>
					)
				}}
				showsVerticalScrollIndicator={false}
				estimatedItemSize={20}
				keyExtractor={item => item.id}
			/>
		</Box>
	)
}
