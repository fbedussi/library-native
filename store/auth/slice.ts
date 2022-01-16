import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from '../../model/model'

const initialState: AuthState = {
	userId: '',
};

export const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		_setUserId: (state, { payload }: PayloadAction<string>) => {
			state.userId = payload;
		},
	},
});

export default slice.reducer;
