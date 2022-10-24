import { useEffect } from 'react'

import { FlatList } from 'react-native'
import styled from 'styled-components/native'

import ProfileRenderItem from '@components/molecules/personal/PersonalHorizatonalItem'
import { authorizationParseToken } from '@util/hooks/auth/useAuthorizationToken'
// import { useAuthorizedProfilesLazyQuery } from '@graphql/generated/graphql-gw.generated';

const OuterView = styled.View`
	width: 100%;
	height: 100%;
`

const VerticalProfileLists = props => {
	const getAuthorizationProfiles = async () => {
		const { data } = await authorizationParseToken()
		if (data?.profiles) {
			data?.profiles.forEach(profile => {
				delete profile.isActive
				delete profile.authorizationToken
				delete profile.profileType
				delete profile.refreshToken
			})
			// queryAuthorizedProfiles({
			//   variables: {
			//     where: {
			//       Profiles: data?.profiles,
			//     },
			//   },
			// });
		}
	}

	useEffect(() => {
		getAuthorizationProfiles()
	}, [])

	// const [queryAuthorizedProfiles, { data, loading, error }] = useAuthorizedProfilesLazyQuery({
	//   fetchPolicy: 'network-only',
	// });

	// if (loading || !data || !data.authorizedProfiles) return null;

	// const profiles = data.authorizedProfiles?.Profiles;

	return (
		<OuterView>
			{/* <FlatList
        keyExtractor={(_item, index) => index.toString()}
        data={profiles}
        renderItem={(item) => {
          return (
            <ProfileRenderItem
              item={{
                item: item.item,
                index: item.index,
              }}
              data={data}
              onPress={() => props.onPress(item)}
              loading={props.loading}
            />
          );
        }}
      /> */}
		</OuterView>
	)
}

export default VerticalProfileLists
