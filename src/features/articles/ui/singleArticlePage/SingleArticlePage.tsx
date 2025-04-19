import { useParams, Link } from 'react-router-dom';
import { selectUserCreated } from '../../model/ArticlesSlice';
import s from './SingleArticlePage.module.scss';
import { useAppSelector } from '@/app/hooks/hooks';
import { useGetArticleByIdQuery } from '@/features/articles/api/guardianApi';
import { Button } from '@/app/components/button/Button';
import { PATH } from '@/routes/Paths';
import { ActionButtons } from '@/features/articles/ui/actionButtons/ActionButtons';
import { Loader } from '@/app/components/loader/Loader';
import { ErrorMessage } from '@/app/components/errorMessage/ErrorMessage';
import { MSG } from '@/features/articles/utils/messagesVariables';

export const SingleArticlePage = () => {
	const { id } = useParams<{ id: string }>();

	if (!id) {
		return <div>Invalid article ID</div>;
	}

	const userCreatedArticles = useAppSelector(selectUserCreated);
	const userArticle = userCreatedArticles.find(article => article.id === id);

	const { data, error, isLoading } = useGetArticleByIdQuery(id, {
		skip: !!userArticle
	});

	const apiArticle = data?.response?.content;
	const article = userArticle || apiArticle;


	if (isLoading) return <Loader fullScreen />;
	if (error || !article) return <ErrorMessage message={MSG.ARTICLE_NOT_FOUND} fullScreen/>

	return (
		<div className={s.container}>
			<div className={s.top}>
				<Button as={Link} to={PATH.PRODUCTS} variant='link'>← Back to Articles</Button>

				<div className={s.actions}>
					<ActionButtons articleId={article.id} isHovering redirectAfterDeleting/>
				</div>
			</div>

			<article className={s.article}>
				<h1 className={s.title}>{article.webTitle}</h1>

				<div className={s.meta}>
					<span className={s.section}>{article.sectionName}</span>
					<span>
						{new Date(article.webPublicationDate).toLocaleDateString()}
					</span>
				</div>

				{article.fields?.thumbnail && (
					<div className={s.featuredImage}>
						<img
							src={article.fields.thumbnail}
							alt={article.webTitle}
							className={s.image}
						/>
					</div>
				)}

				<div className={s.content}>

					{article.fields?.trailText && (
						<p className={s.trailText}
							dangerouslySetInnerHTML={{ __html: article.fields.trailText }}>
						</p>
					)}

					{article.fields?.body ? (
						<div
							className={s.body}
							dangerouslySetInnerHTML={{ __html: article.fields.body }}
						/>
					) : (
						<p className={s.excerpt}>
							{article.fields?.trailText || MSG.NO_CONTENT}
						</p>
					)}
				</div>

				<div className={s.footer}>
					<a
						href={article.webUrl}
						target="_blank"
						rel="noopener noreferrer"
						className={s.sourceLink}
					>
						Read original article
					</a>
				</div>
			</article>
		</div>
	);
};
