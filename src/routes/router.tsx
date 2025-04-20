import App from '@/app/App'
import { createHashRouter, Navigate } from 'react-router-dom'
import { PATH } from '@/routes/Paths'
import { ArticlesPage } from '@/features/articles/ui/ArticlesPage'
import { SingleArticlePage } from '@/features/articles/ui/singleArticlePage/SingleArticlePage'
import { CreateArticlePage } from '@/features/articles/ui/createArticlePage/CreateArticlePage'
import { NotFound } from '@/app/components/notFound/NotFound'

export const router = createHashRouter([
	{
		path: PATH.ROOT,
		element: <App />,
		errorElement: <NotFound />,

		children: [
			{
				index: true,
				element: <Navigate to="/products" replace />,
			},
			{
				path: PATH.PRODUCTS,
				children: [
					{
						index: true,
						element: <ArticlesPage />,
					},
					{
						path: ':id',
						element: <SingleArticlePage />,
					},
				],
			},
			{
				path: PATH.CREATE_PRODUCT,
				element: <CreateArticlePage />,
			},
			{
				path: `${PATH.EDIT_PRODUCT}/:id`,
				element: <CreateArticlePage />,
			},
		],
	},
	{
		path: PATH.NOT_FOUND,
		element: <NotFound />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
])
