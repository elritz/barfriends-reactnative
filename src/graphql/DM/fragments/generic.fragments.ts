import { gql } from '@apollo/client'

export const ERROR_FRAGMENT = gql`
	fragment ERROR_FRAGMENT on ErrorManaging {
		errorCode
		message
	}
`
export const ERROR_PROFILING_FRAGMENT = gql`
	fragment ERROR_PROFILING_FRAGMENT on ErrorProfiling {
		errorCode
		message
	}
`
// export const SUCCESS_FRAGMENT = gql`
// 	fragment SUCCESS_FRAGMENT on Success {
// 		type
// 		successCode
// 		message
// 	}
// `
