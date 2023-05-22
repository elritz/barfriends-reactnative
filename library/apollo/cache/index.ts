import { InMemoryCache } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	AsyncStorageWrapper,
	CachePersistor,
	persistCache,
	persistCacheSync,
} from 'apollo3-cache-persist'

export const cache: InMemoryCache = new InMemoryCache({
	typePolicies: {},
})

// new CachePersistor({
// 	cache,
// 	storage: new AsyncStorageWrapper(AsyncStorage),
// 	persistenceMapper: async (data: any) => {
// 		console.log('data', JSON.stringify(data, null, 4))
// 		return data
// 	},
// })
