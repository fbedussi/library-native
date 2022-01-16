import history from '../history'
import { SearchCriteria, SortingOrder } from '../model/model'

export const genCharArray = (firstChar: string, lastChar: string) => {
	let arr = [];
	let curentCharCode = firstChar.charCodeAt(0);
	const lastCharCode = lastChar.charCodeAt(0);
	for (; curentCharCode <= lastCharCode; ++curentCharCode) {
		arr.push(String.fromCharCode(curentCharCode));
	}
	return arr;
};

export const isSearchKey = (
	key: string | null,
): key is keyof SearchCriteria => {
	const searchCriteriaKeys: (keyof SearchCriteria)[] = [
		'author',
		'title',
		'location',
	];
	return searchCriteriaKeys.includes(key as keyof SearchCriteria);
};

export const isSortingOrder = (order: string | null): order is SortingOrder => {
	const searchCriteriaKeys: SortingOrder[] = ['asc', 'desc'];
	return searchCriteriaKeys.includes(order as SortingOrder);
};

export const handleUrlQuery = (queryParams: Record<string, string>) => {
	const params = new URLSearchParams();
	Object.entries(queryParams).forEach(([key, value]) => {
		if (value) {
			params.append(key, value);
		} else {
			params.delete(key);
		}
	});
	history.push({ search: params.toString() });
};
