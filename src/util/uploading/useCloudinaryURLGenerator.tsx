import { Cloudinary } from '@cloudinary/url-gen'
import { Resize } from '@cloudinary/url-gen/actions/resize'
import * as ImageManipulator from 'expo-image-manipulator'

// Create your instance
const cld = new Cloudinary({
	cloud: {
		cloudName: 'barfriends',
	},
	url: {
		secure: true, // force https, set to false to force http
	},
})

const useCloudinaryURLGenerator = async (photo: string): Promise<any> => {
	const myImage = cld.image('story_photo')

	console.log(
		'🚀 ~ file: useCloudinaryMultipleImageUploading.tsx:17 ~ useCloudinaryMultipleImageUploading ~ myImage',
		myImage,
	)
	myImage.resize(Resize.scale().width(100).height(100))
	const myURL = myImage.toURL()
	console.log('==============>', JSON.stringify(myURL, null, 4))
}

export default useCloudinaryURLGenerator
