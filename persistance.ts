import AsyncStorage from '@react-native-async-storage/async-storage'

export const persistUserId = (userId: string) => {
	AsyncStorage.setItem('library-userId', userId);
};

export const getPersistedtUserId = () => {
	return AsyncStorage.getItem('library-userId');
}

export const deletePersistedtUserId = () => {
	AsyncStorage.removeItem('library-userId');
}
