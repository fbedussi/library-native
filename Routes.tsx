import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NativeRouter, Route, Routes } from 'react-router-native'

import AuthenticatedRoute from './components/AuthenticatedRoute'
// import history from './history'
// import AddBookPage from './pages/AddBookPage'
// import CameraPage from './pages/CameraPage'
// import EditBookPage from './pages/EditBookPage'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import authActions from './store/auth/actions'
import { selectUserId } from './store/auth/selectors'
// import SettingsPage from './pages/SettingsPage'
// import SingleBookPage from './pages/SingleBookPage'
// import ViewAllPage from './pages/ViewAllPage'
import booksActions from './store/books/actions'

const Routes2 = () => {
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId)

	useEffect(() => {
		dispatch(authActions.loadUserId())
	}, [dispatch])

	useEffect(() => {
		if (userId) {
			dispatch(booksActions.load());
		}
	}, [dispatch, userId]);

	return (
		<NativeRouter>
			<Routes>
				{/* <AuthenticatedRoute path="/settings">
				<SettingsPage />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/add">
				<AddBookPage />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/view-all">
				<ViewAllPage />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/book/:bookId">
				<SingleBookPage />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/camera">
				<CameraPage />
			</AuthenticatedRoute>
			<AuthenticatedRoute path="/edit/:bookId">
				<EditBookPage />
			</AuthenticatedRoute>*/}
				<Route path="/search" element={<SearchPage />} />
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</NativeRouter >
	);
};

export default Routes2;
