import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-native'

import { selectBooks } from '../store/books/selectors'
import { Badge, IconButton } from '../styleguide'

const ViewAllLink = () => {
	const books = useSelector(selectBooks);
	return (
		<Link to="/view-all">
			{/* <Badge>{books.length}</Badge> */}
			<IconButton icon="book" />
		</Link>
	);
};

export default ViewAllLink;
