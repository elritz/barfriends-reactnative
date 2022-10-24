import { gql } from '@apollo/client'
import { ERROR_PROFILING_FRAGMENT, CODE_FRAGMENT } from '@graphql/DM/fragments/index.fragments'

export const AUTHENTICATION_DEVICE_OWNER_CODE_MUTATION = gql`
	${CODE_FRAGMENT}
	${ERROR_PROFILING_FRAGMENT}
	mutation sendAuthenticatorDeviceOwnerCode($data: CodeData, $where: CodeWhere) {
		sendAuthenticatorDeviceOwnerCode(data: $data, where: $where) {
			... on Code {
				...CODE_FRAGMENT
			}
			... on ErrorProfiling {
				...ERROR_PROFILING_FRAGMENT
			}
		}
	}
`
