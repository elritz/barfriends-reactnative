import * as React from 'react'

import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import styled from 'styled-components/native'

interface SignupCredentialScreenTemplateProps {
	children: React.ReactNode
}

const SignupCredentialScreenTemplate = ({
	children,
}: SignupCredentialScreenTemplateProps) => {
	const methods = useForm({
		defaultValues: {
			termsOfService: {
				agreed: false,
				termsId: '',
				serviceId: '',
			},
		},
	})

	return <FormProvider {...methods}>{children}</FormProvider>
}
export default SignupCredentialScreenTemplate
