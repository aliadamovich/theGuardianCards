import s from './ActionsButtons.module.scss'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { deleteArticle, selectFavorites, selectUserCreated, toggleFavorite } from '@/features/articles/model/ArticlesSlice';
import { MdDeleteOutline, MdStar, MdStarBorder } from 'react-icons/md';
import { PATH } from '@/routes/Paths';
import { Link, useNavigate } from 'react-router-dom';
import { MdEdit } from "react-icons/md";

type Props = {
	articleId: string
	isHovering?: boolean
	redirectAfterDeleting?: boolean
}

export const ActionButtons = ({ articleId, isHovering, redirectAfterDeleting = false }: Props) => {
	const dispatch = useAppDispatch();
	const favorites = useAppSelector(selectFavorites);
	const navigate = useNavigate();
	const isFavorite = favorites.includes(articleId);
	const userCreatedArticles = useAppSelector(selectUserCreated);
	const userArticle = userCreatedArticles.find(article => article.id === articleId);

		const handleFavoriteClick = (e: React.MouseEvent) => {
			e.stopPropagation();
			dispatch(toggleFavorite(articleId));
		};
	
		const handleDeleteClick = (e: React.MouseEvent) => {
			e.stopPropagation();
			dispatch(deleteArticle(articleId));
			redirectAfterDeleting && navigate(PATH.PRODUCTS);
		};


	return (
		<div className={s.iconButtons}>
			{userArticle && (
				<Link to={`${PATH.EDIT_PRODUCT}/${articleId}`} 
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

