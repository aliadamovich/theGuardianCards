import { Button } from '@/app/components/button/Button'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks'
import s from './FilterButtons.module.scss'
import { selectFilter, setFilter } from '@/features/articles/model/ArticlesSlice'
import { useSearchParams } from 'react-router-dom'

export const FilterButtons = ({ disabled }: { disabled: boolean }) => {
	const dispatch = useAppDispatch()
	const activeFilter = useAppSelector(selectFilter)
	const [, setSearchParams] = useSearchParams()

	const handleFilterChange = (filter: 'all' | 'favorites') => {
		dispatch(setFilter(filter))
		if (filter === 'favorites') {
			setSearchParams({})
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
