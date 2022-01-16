import React from 'react'
import { Text } from 'react-native'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-native'
import styled from 'styled-components/native'

import { Book } from '../model/model'
import booksActions from '../store/books/actions'
import { Card, IconButton } from '../styleguide'

const StyledCard = styled(Card)`
	display: flex;
	width: 100%;
`;

const BookInfo = styled.View`
	flex: 1;
	max-width: 100%;
`;

const BookCardActions = styled(Card.Actions)`
	padding: 0;
`;

const BookCover = styled(Card.Cover)`
	width: 25%;
`;

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
	const dispatch = useDispatch();
	const { author, title, location, id, coverPath } = book;
	return (
		<StyledCard mode="outlined">
			<BookInfo>
				<Card.Content>
					<Link to={`/book/${id}`}>
						<Card.Title title={author} subtitle={title} />
					</Link>
					<Text>{location}</Text>
				</Card.Content>
				<BookCardActions>
					<IconButton
						data-testid="delete-btn"
						onPress={() => {
							dispatch(booksActions.remove(id));
						}}
						icon="Delete"
					/>
					<Link to={`/edit/${id}`} data-testid="edit-link">
						<IconButton icon="Edit" />
					</Link>
				</BookCardActions>
			</BookInfo>
			{!!coverPath && <BookCover data-testid="book-cover" source={{ uri: coverPath }} />}
		</StyledCard>
	);
};

export default BookCard;
