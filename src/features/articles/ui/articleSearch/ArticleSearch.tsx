import { TextField } from '@/app/components/textField/TextField'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { selectSearchTerm, setSearchTerm } from '@/features/articles/model/ArticlesSlice';
import React from 'react'

export const ArticleSearch = () => {
	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector(selectSearchTerm);
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(e.target.value));
	};

	return (
		<TextField
			search
			placeholder="Search articles..."
			value={searchTerm}
			onChange={handleSearchChange}
		/>
	)
}

