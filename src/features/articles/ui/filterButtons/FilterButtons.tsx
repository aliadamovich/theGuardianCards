import { Button } from '@/app/components/button/Button'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import s from './FilterButtons.module.scss'
import { selectFilter, setFilter } from '@/features/articles/model/ArticlesSlice'
import { useSearchParams } from 'react-router-dom';

export const FilterButtons = ({ disabled }: { disabled: boolean }) => {
	const dispatch = useAppDispatch()
	const activeFilter = useAppSelector(selectFilter)
	const [searchParams, setSearchParams] = useSearchParams();
	console.log(searchParams);
const page = searchParams.get('page')
console.log('pagee', page);

	const handleFilterChange = (filter: 'all' | 'favorites') => {
		dispatch(setFilter(filter))
		if (filter === 'favorites') {
			setSearchParams({})
			// searchParams.delete('page')
			// setSearchParams(searchParams)
		}
	}

	return (
		<div className={s.filters}>
			<Button
				variant={activeFilter === 'all' ? 'active' : 'primary'}
				onClick={() => handleFilterChange('all')}
				disabled={disabled}
			>
				All Articles
			</Button>
			<Button
				variant={activeFilter === 'favorites' ? 'active' : 'primary'}
				onClick={() => handleFilterChange('favorites')}
				disabled={disabled}
			>
				Favorites
			</Button>
		</div>
	)
}
