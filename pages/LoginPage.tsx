import { Formik } from 'formik'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import styled from 'styled-components/native'

import { PageWrapper } from '../components/CommonComponents'
import { pxToRem } from '../libs/styles'
import authActions from '../store/auth/actions'
import { selectUserId } from '../store/auth/selectors'
import { Button, Switch, TextField } from '../styleguide'
import theme from '../styleguide/theme'

const LoginPageWrapper = styled(PageWrapper)`
	justify-content: center;
`;

const LoginForm = styled.View`
	margin: 0 auto;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	margin-bottom: ${pxToRem(theme.spacing(2))}rem;

	> * {
		margin-bottom: ${pxToRem(theme.spacing(1))}rem;
	}
`;

const SwitchWrapper = styled.View`
	display: flex;
	flex-direction: row;
	/* gap: 1em; */
`

const ButtonWrapper = styled.View`
	display: flex;
	width: 100%;
`;

const LoginPage: React.FC = () => {
	const userId = useSelector(selectUserId);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	return userId ? (
		<Navigate to="/search" replace />
	) : (
		<LoginPageWrapper>
			<Formik
				initialValues={{
					username: '',
					password: '',
					rememberMe: false,
				}}
				onSubmit={values => {
					dispatch(authActions.login(values));
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => {
					return (
						<LoginForm>
							<TextField
								label={t('app.username')}
								mode="outlined"
								value={values.username}
								onChangeText={handleChange('username')}
								onBlur={handleBlur('username')}
								autoComplete="username"
							/>
							<TextField
								label={t('app.password')}
								mode="outlined"
								value={values.password}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								autoComplete="password"
							/>
							<SwitchWrapper>
								<Text>{t('app.rememberMe')}</Text>
								<Switch
									value={values.rememberMe}
									onValueChange={(value) => setFieldValue('rememberMe', value)}
								/>
							</SwitchWrapper>
							<ButtonWrapper>
								<Button /* color="primary" */ mode="contained" onPress={handleSubmit}>
									{t('app.login')}
								</Button>
							</ButtonWrapper>
						</LoginForm>
					);
				}}
			</Formik>
		</LoginPageWrapper>
	);
};

export default LoginPage;
