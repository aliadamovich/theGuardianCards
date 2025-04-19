import s from './ActionsButtons.module.scss'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { deleteArticle, selectFavoriteIds, selectUserCreated, toggleFavorite } from '@/features/articles/model/ArticlesSlice';
import { MdDeleteOutline, MdStar, MdStarBorder } from 'react-icons/md';
import { PATH } from '@/routes/Paths';
import { Link, useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";
import { GuardianArticle } from '@/features/articles/api/guardianApi.types';

type Props = {
	article: GuardianArticle
	isHovering?: boolean
	redirectAfterDeleting?: boolean
}

export const ActionButtons = ({ article, isHovering, redirectAfterDeleting = false }: Props) => {
	const dispatch = useAppDispatch();
	const favorites = useAppSelector(selectFavoriteIds);
	const navigate = useNavigate();
	const isFavorite = favorites.includes(article.id);
	const userCreatedArticles = useAppSelector(selectUserCreated);
	const userArticle = userCreatedArticles.find(a => a.id === article.id);

		const handleFavoriteClick = (e: React.MouseEvent) => {
			e.stopPropagation();
			dispatch(toggleFavorite(article));
		};
	
		const handleDeleteClick = (e: React.MouseEvent) => {
			e.stopPropagation();
			dispatch(deleteArticle(article.id));
			redirectAfterDeleting && navigate(PATH.PRODUCTS);
		};


	return (
		<div className={s.iconButtons}>
			{userArticle && (
				<Link to={`${PATH.EDIT_PRODUCT}/${article.id}`} 
					aria-label="Edit article"
					className={clsx(s.editButton, isHovering && s.hoveredButton)}
					onClick={(e) => e.stopPropagation()}
					>
					<MdEdit />
				</Link>
			)}

			<button
				className={clsx(s.deleteButton, isHovering && s.hoveredButton)}
				onClick={handleDeleteClick}
				aria-label="Delete article"
				title="Delete article"
			>
				<MdDeleteOutline />
			</button>

			<button
				className={`${s.likeButton} ${isFavorite ? s.liked : ''}`}
				onClick={handleFavoriteClick}
				aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
				title={isFavorite ? "Remove from favorites" : "Add to favorites"}
			>
				{isFavorite ? <MdStar /> : <MdStarBorder />}
			</button>
		</div>
	)
}

