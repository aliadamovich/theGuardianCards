import { Button } from '@/app/components/button/Button';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { selectFilter, setFilter } from '@/features/products/model/ArticlesSlice';
import s from './FilterButtons.module.scss'

export const FilterButtons = () => {
	const dispatch = useAppDispatch();
	const activeFilter = useAppSelector(selectFilter);
	
	const handleFilterChange = (filter: 'all' | 'favorites') => {
		dispatch(setFilter(filter));
	};
	return (
		<div className={s.filters}>
			<Button variant={activeFilter === 'all' ? 'active' : 'primary'}
				onClick={() => handleFilterChange('all')}
			>
				All Articles
			</Button>
			<Button variant={activeFilter === 'favorites' ? 'active' : 'primary'}
				onClick={() => handleFilterChange('favorites')}
			>
				Favorites
			</Button>
		</div>
	)
}

