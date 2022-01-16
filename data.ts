import { v4 as uuidv4 } from 'uuid'

import db, { storage, UploadTaskSnapshot } from './firebase'
import { b64toBlob } from './libs/photos'
import {
  Base64, Book, DbBook,
  Id
} from './model/model'

const booksCollection = db.collection('books');
// const booksCollection = {}

export const searchBooksInDB = (
	handleUpdate: (books: Book[]) => void,
	searchCriteria: {
		author: string;
		title: string;
		location: string;
		userId: Id;
	},
) => {
	const { author, title, location, userId } = searchCriteria;
	booksCollection
		.where('title', '>=', title)
		.where('author', '>=', author)
		.where('location', '>=', location)
		.where('userId', '==', userId)
		.get()
		.then(function (querySnapshot) {
			let results: Book[] = [];
			querySnapshot.forEach(function (doc) {
				const dataFromDb = doc.data() as Book;
				results.push(dataFromDb);
			});
			handleUpdate(results);
		});
};

export const loadBooksFromDB = (
	handleUpdate: (books: Book[]) => void,
	userId: Id,
) => {
	booksCollection
		.where('userId', '==', userId)
		.get()
		.then(function (querySnapshot) {
			let results: Book[] = [];
			querySnapshot.forEach(doc => {
				const dataFromDb = doc.data() as Omit<Book, 'id'>;
				results.push({ ...dataFromDb, id: doc.id });
			});
			handleUpdate(results);
		});
};

export const addBookInDB = (
	book: Omit<Book, 'id'>,
	userId: Id,
): Promise<Book> => {
	return Promise.resolve({
		id: 'b1',
		author: 'manzoni',
		title: 'i promsessi sposi',
		location: 'a2',
		coverPath: '',
	})
	return booksCollection.add({ ...book, userId }).then(doc => {
		return { ...book, id: doc.id };
	});
};

export const deleteBookInDB = (id: Id) => {
	return booksCollection.doc(id).delete();
};

export const updateBookInDB = (book: DbBook) => {
	return booksCollection.doc(book.id).set(book);
};

export const uploadPhotoToBucket = (
	base64: Base64,
	contentType: string,
): Promise<UploadTaskSnapshot> => {
	// return Promise.resolve()
	const uuid = uuidv4();
	const pictureRef = storage.child(`${uuid}.jpg`);
	return pictureRef
		.put(b64toBlob(base64, contentType))
		.catch(error => console.error(error));
};

export const getPhotoUrl = (photoId: string) => {
	return storage.child(photoId).getDownloadURL();
}
