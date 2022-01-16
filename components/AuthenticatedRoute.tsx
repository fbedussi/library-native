import React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { Route, RouteProps } from 'react-router-native'

import { selectUserId } from '../store/auth/selectors'

const AuthenticatedRoute: React.FC<RouteProps> = ({ children, ...props }) => {
	const userId = useSelector(selectUserId);

	return !userId ?/*  <Redirect to="/" /> */ <View>hi</View> : <Route {...props}>{children}</Route>;
};

export default AuthenticatedRoute;
