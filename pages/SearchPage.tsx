import Fuse from 'fuse.js'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-native'
import styled from 'styled-components/native'

import BookCard from '../components/BookCard'
// import BookForm from '../components/BookForm'
import { PageWrapper, TopAppBar } from '../components/CommonComponents'
// import SortingBar from '../components/SortingBar'
import ViewAllLink from '../components/ViewAllLink'
import history from '../history'
import { useQuery } from '../hooks/useQuery'
import { search, sort } from '../libs/search'
import { pxToRem } from '../libs/styles'
import { handleUrlQuery, isSearchKey, isSortingOrder } from '../libs/utils'
import { Book, SearchCriteria, SortingOrder } from '../model/model'
import booksActions from '../store/books/actions'
import { selectBooks } from '../store/books/selectors'
import { CircularProgress, Fab, IconButton } from '../styleguide'
// import { Add, Search } from '../styleguide/icons'
import theme from '../styleguide/theme'

const BooksList = styled.View`
	flex: 1;
	> * {
		margin-bottom: ${pxToRem(theme.spacing(1))}rem;
	}
`;

const FabLink = styled(Link)`
	position: absolute;
	z-index: 1;
	bottom: ${pxToRem(theme.spacing(2))}rem;
	right: ${pxToRem(theme.spacing(2))}rem;
	margin: 0 auto;
	width: ${theme.spacing(7)}px;
`;

const SearchPage: React.FC = () => {
	const query = useQuery();
	const initialValues = {
		author: query.get('author') || '',
		title: query.get('title') || '',
		location: query.get('location') || '',
	};
	const [searchCriteria, setSearchCriteria] = useState(initialValues);
	const dispatch = useDispatch();
	const books = useSelector(selectBooks);
	const queryKey = query.get('key');
	const defaultSortingKey: keyof SearchCriteria = 'author';
	const [sortingKey, setSortingKey] = useState(
		isSearchKey(queryKey) ? queryKey : defaultSortingKey,
	);
	const queryOrder = query.get('order');
	const defaultSortingOrder: SortingOrder = 'asc';
	const [sortingOrder, setSortingOrder] = useState(
		isSortingOrder(queryOrder) ? queryOrder : defaultSortingOrder,
	);
	const queryScrollTop = query.get('scrollTop');
	const defaultScrollTop = parseInt(queryScrollTop || '0');
	const [scrollTop, setScrollTop] = useState(defaultScrollTop);
	const scrollableContainerRef = useRef<HTMLDivElement>(null);
	const [filteredBooks, setFilteredBooks] = useState<Fuse.FuseResult<Book>[]>();
	const { t } = useTranslation();

	useEffect(() => {
		if (scrollableContainerRef.current && filteredBooks) {
			scrollableContainerRef.current.scrollTop = scrollTop;
		}
	}, [filteredBooks]);

	useEffect(() => {
		if (books.length) {
			dispatch(booksActions.initSearchAction());
			// trick to update state and rerender the component to apply seachCriteria to
			// newly loaded books
			setSearchCriteria({ ...searchCriteria });
		}
	}, [dispatch, books]);

	useEffect(() => {
		handleUrlQuery({
			key: sortingKey,
			order: sortingOrder,
			scrollTop: scrollTop.toString(),
			...searchCriteria,
		});
	}, [sortingKey, sortingOrder, searchCriteria, scrollTop]);

	useEffect(() => {
		setFilteredBooks(search(searchCriteria));
	}, [searchCriteria]);

	return (
		<PageWrapper
		// ref={scrollableContainerRef}
		// onScroll={e => {
		// 	setScrollTop(e.currentTarget.scrollTop);
		// }}
		>
			<TopAppBar>
				<IconButton icon="dots-vertical" onPress={() => history.push('/settings')} />
				{!books.length ? <CircularProgress /> : null}
				<Text>{t('app.search')}</Text>
				<ViewAllLink />
			</TopAppBar>
			{/* <BookForm
				initialValues={initialValues}
				onSubmit={values => {
					setSearchCriteria(values);
				}}
				PrimaryIcon={<Search />}
				primaryLabel={t('app.search')}
			/> */}

			{/* <SortingBar
				sortingOrder={sortingOrder}
				setSortingOrder={setSortingOrder}
				sortingKey={sortingKey}
				setSortingKey={setSortingKey}
			/> */}

			<BooksList>
				{filteredBooks
					?.filter(({ score }) => score && score < 0.8)
					.sort(
						(res1, res2) =>
							sort(res1.item[sortingKey], res2.item[sortingKey]) *
							(sortingOrder === 'asc' ? 1 : -1),
					)
					.map(({ item }) => (
						<BookCard key={item.id} book={item} />
					))}
			</BooksList>

			<FabLink to="/add">
				<Fab icon="plus" />
			</FabLink>
		</PageWrapper>
	);
};

export default SearchPage;
