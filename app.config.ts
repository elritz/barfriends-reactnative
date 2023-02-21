import { ConfigContext, ExpoConfig } from '@expo/config'
import 'dotenv/config'

module.exports = (context: ConfigContext): ExpoConfig | null => {
	switch (process.env.ENVIRONMENT) {
		case 'production':
			return {
				...context.config,
				name: 'Barfriends-production',
				slug: 'barfriends',
				owner: 'barfriends',
				scheme: 'barfriends-production',
				orientation: 'portrait',
				userInterfaceStyle: 'automatic',
				primaryColor: '#FF7000',
				updates: {
					url: 'https://u.expo.dev/7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					fallbackToCacheTimeout: 2000,
				},
				runtimeVersion: {
					policy: 'sdkVersion',
				},
				jsEngine: 'hermes',
				assetBundlePatterns: ['**/*'],
				platforms: ['ios', 'android'],
				icon: './src/assets/images/icon/icon.png',
				splash: {
					image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.light.png`,
					resizeMode: 'cover',
					dark: {
						image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.dark.png`,
						resizeMode: 'cover',
					},
				},
				ios: {
					bundleIdentifier: 'com.barfriends.production',
					supportsTablet: false,
					icon: `./src/assets/images/icon/icon.png`,
					jsEngine: 'hermes',
					// splash: {
					// 	image: `./src/assets/images/splash/splash.png`,
					// 	resizeMode: 'cover',
					// 	backgroundColor: '#0D0D0D',
					// },
					config: {
						googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
					},
					infoPlist: {
						NSLocationAlwaysUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationAlwaysAndWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSCameraUsageDescription:
							'Barfriends app uses the camera to provide a photo for their profile.',
						NSPhotoLibraryUsageDescription:
							"Barfriends app uses photo library to upload user's profile picture.",
						UIBackgroundModes: ['remote-notification', 'location', 'fetch'],
						NSPhotoLibraryAddUsageDescription:
							'Barfriends would like access to your photos so you can add a cover image to your profile.',
					},
				},
				android: {
					versionCode: 2,
					package: 'com.barfriends.production',
					backgroundColor: '#0D0D0D',
					adaptiveIcon: {
						foregroundImage: './src/assets/images/adaptive-icon.png',
					},
					// splash: {
					// 	image: `./src/assets/images/splash/splash.png`,
					// 	resizeMode: 'contain',
					// 	backgroundColor: '#0D0D0D',
					// },
					config: {
						googleMaps: {
							apiKey: process.env.GOOGLE_ANDROID_API_KEY,
						},
					},
					permissions: [
						'ACCESS_COARSE_LOCATION',
						'ACCESS_FINE_LOCATION',
						'ACCESS_BACKGROUND_LOCATION',
						'CAMERA',
						'NOTIFICATIONS',
						'MANAGE_DOCUMENTS',
						'READ_CONTACTS',
						'READ_CALENDAR',
						'WRITE_CALENDAR',
						'READ_EXTERNAL_STORAGE',
						'READ_PHONE_STATE',
						'RECORD_AUDIO',
						'USE_FINGERPRINT',
						'VIBRATE',
						'WAKE_LOCK',
						'WRITE_EXTERNAL_STORAGE',
						'com.anddoes.launcher.permission.UPDATE_COUNT',
						'com.android.launcher.permission.INSTALL_SHORTCUT',
						'com.google.android.c2dm.permission.RECEIVE',
						'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
						'com.google.android.providers.gsf.permission.READ_GSERVICES',
						'com.htc.launcher.permission.READ_SETTINGS',
						'com.htc.launcher.permission.UPDATE_SHORTCUT',
						'com.majeur.launcher.permission.UPDATE_BADGE',
						'com.sec.android.provider.badge.permission.READ',
						'com.sec.android.provider.badge.permission.WRITE',
						'com.sonyericsson.home.permission.BROADCAST_BADGE',
					],
				},
				web: {
					favicon: './src/assets/images/favicon.png',
				},
				packagerOpts: {
					sourceExts: ['cjs'],
				},
			}
		case 'staging':
			return {
				...context.config,
				name: 'Barfriends (stage)',
				slug: 'barfriends',
				owner: 'barfriends',
				scheme: 'barfriends-staging',
				orientation: 'portrait',
				userInterfaceStyle: 'automatic',
				updates: {
					url: 'https://u.expo.dev/7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					fallbackToCacheTimeout: 2000,
				},
				primaryColor: '#FF7000',
				runtimeVersion: {
					policy: 'sdkVersion',
				},

				assetBundlePatterns: ['**/*'],
				platforms: ['ios', 'android'],
				icon: './src/assets/images/icon/icon.png',
				splash: {
					image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.light.png`,
					resizeMode: 'cover',
					dark: {
						image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.dark.png`,
						resizeMode: 'cover',
					},
				},
				ios: {
					bundleIdentifier: 'com.barfriends.staging',
					supportsTablet: false,
					icon: `./src/assets/images/icon/icon.png`,
					// splash: {
					// 	image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.png`,
					// 	resizeMode: 'cover',
					// 	// backgroundColor: '#0D0D0D',
					// },
					config: {
						googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
					},
					infoPlist: {
						LSApplicationQueriesSchemes: ['uber'],
						NSLocationAlwaysUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationAlwaysAndWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSCameraUsageDescription:
							'Barfriends app uses the camera to provide a photo for their profile.',
						NSPhotoLibraryUsageDescription:
							'Barfriends app uses photo library to upload photos and videos.',
						UIBackgroundModes: ['remote-notification', 'location', 'fetch'],
						NSPhotoLibraryAddUsageDescription:
							'Barfriends would access your meida library, so you can add photos for your profile and other social purposes.',
					},
				},
				android: {
					versionCode: 2,
					package: 'com.barfriends.staging',
					backgroundColor: '#0D0D0D',
					adaptiveIcon: {
						foregroundImage: './src/assets/images/adaptive-icon.png',
					},
					googleServicesFile: './google-services.json',
					// splash: {
					// 	image: `./src/assets/images/splash/splash.png`,
					// 	resizeMode: 'contain',
					// 	backgroundColor: '#0D0D0D',
					// },
					config: {
						googleMaps: {
							apiKey: process.env.GOOGLE_ANDROID_API_KEY,
						},
					},
					permissions: [
						'FOREGROUND_SERVICE',
						'ACCESS_COARSE_LOCATION',
						'ACCESS_FINE_LOCATION',
						'CAMERA',
						'NOTIFICATIONS',
						'MANAGE_DOCUMENTS',
						'READ_CONTACTS',
						'READ_CALENDAR',
						'WRITE_CALENDAR',
						'READ_EXTERNAL_STORAGE',
						'READ_PHONE_STATE',
						'RECORD_AUDIO',
						'USE_FINGERPRINT',
						'VIBRATE',
						'WAKE_LOCK',
						'WRITE_EXTERNAL_STORAGE',
						'com.anddoes.launcher.permission.UPDATE_COUNT',
						'com.android.launcher.permission.INSTALL_SHORTCUT',
						'com.google.android.c2dm.permission.RECEIVE',
						'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
						'com.google.android.providers.gsf.permission.READ_GSERVICES',
						'com.htc.launcher.permission.READ_SETTINGS',
						'com.htc.launcher.permission.UPDATE_SHORTCUT',
						'com.majeur.launcher.permission.UPDATE_BADGE',
						'com.sec.android.provider.badge.permission.READ',
						'com.sec.android.provider.badge.permission.WRITE',
						'com.sonyericsson.home.permission.BROADCAST_BADGE',
					],
				},
				web: {
					favicon: './src/assets/images/favicon.png',
				},
				packagerOpts: {
					sourceExts: ['cjs'],
				},
				extra: {
					eas: {
						projectId: '7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					},
				},
			}
		case 'development':
			return {
				...context.config,
				name: 'Barfriends (dev)',
				slug: 'barfriends',
				owner: 'barfriends',
				scheme: 'barfriends',
				orientation: 'portrait',
				updates: {
					url: 'https://u.expo.dev/7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					fallbackToCacheTimeout: 2000,
				},
				primaryColor: '#FF7000',
				runtimeVersion: {
					policy: 'sdkVersion',
				},
				assetBundlePatterns: ['**/*'],
				platforms: ['ios', 'android'],
				icon: './src/assets/images/icon/icon.png',
				splash: {
					image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.light.png`,
					resizeMode: 'cover',
					dark: {
						image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.dark.png`,
						resizeMode: 'cover',
					},
				},
				ios: {
					// buildNumber: '2.1.6',
					bundleIdentifier: 'com.barfriends.dev',
					supportsTablet: false,
					icon: `./src/assets/images/icon/icon.png`,
					userInterfaceStyle: 'automatic',

					// splash: {
					// 	image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.png`,
					// 	resizeMode: 'cover',
					// 	// backgroundColor: '#0D0D0D',
					// },

					config: {
						googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
					},
					infoPlist: {
						LSApplicationQueriesSchemes: ['uber'],
						NSLocationAlwaysUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationAlwaysAndWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSLocationWhenInUseUsageDescription:
							'Barfriends app uses location to provide list of available activities at bars clubs and pubs and events near a users in addition to checking them in.',
						NSCameraUsageDescription:
							'Barfriends app uses the camera to provide a photo for their profile.',
						NSPhotoLibraryUsageDescription:
							'Barfriends app uses photo library to upload photos and videos.',
						UIBackgroundModes: ['remote-notification', 'location', 'fetch'],
						NSPhotoLibraryAddUsageDescription:
							'Barfriends would access your meida library, so you can add photos for your profile and other social purposes.',
					},
				},
				android: {
					versionCode: 2,
					package: 'com.barfriends.christian',
					backgroundColor: '#0D0D0D',
					userInterfaceStyle: 'automatic',
					adaptiveIcon: {
						foregroundImage: './src/assets/images/adaptive-icon.png',
					},
					googleServicesFile: './google-services.json',
					// splash: {
					// 	image: `./src/assets/images/splash/splash.${process.env.ENVIRONMENT}.png`,
					// 	resizeMode: 'cover',
					// },
					config: {
						googleMaps: {
							apiKey: process.env.GOOGLE_ANDROID_API_KEY,
						},
					},
					permissions: [
						'FOREGROUND_SERVICE',
						'ACCESS_COARSE_LOCATION',
						'ACCESS_FINE_LOCATION',
						'CAMERA',
						'NOTIFICATIONS',
						'MANAGE_DOCUMENTS',
						'READ_CONTACTS',
						'READ_CALENDAR',
						'WRITE_CALENDAR',
						'READ_EXTERNAL_STORAGE',
						'READ_PHONE_STATE',
						'RECORD_AUDIO',
						'USE_FINGERPRINT',
						'VIBRATE',
						'WAKE_LOCK',
						'WRITE_EXTERNAL_STORAGE',
						'com.anddoes.launcher.permission.UPDATE_COUNT',
						'com.android.launcher.permission.INSTALL_SHORTCUT',
						'com.google.android.c2dm.permission.RECEIVE',
						'com.google.android.gms.permission.ACTIVITY_RECOGNITION',
						'com.google.android.providers.gsf.permission.READ_GSERVICES',
						'com.htc.launcher.permission.READ_SETTINGS',
						'com.htc.launcher.permission.UPDATE_SHORTCUT',
						'com.majeur.launcher.permission.UPDATE_BADGE',
						'com.sec.android.provider.badge.permission.READ',
						'com.sec.android.provider.badge.permission.WRITE',
						'com.sonyericsson.home.permission.BROADCAST_BADGE',
					],
				},
				web: {
					favicon: './src/assets/images/favicon.png',
				},
				packagerOpts: {
					sourceExts: ['cjs'],
				},
				extra: {
					eas: {
						projectId: '7ba3f00e-9b58-45fa-8a6e-5ba14d4855e4',
					},
				},
			}
		default: {
			return null
		}
	}
}
