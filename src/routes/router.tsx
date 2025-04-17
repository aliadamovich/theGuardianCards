import App from '@/app/App';
import { ArticlesPage } from '../features/products/ui/ArticlesPage';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATH } from '@/routes/Paths';



export const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: <App />,
		errorElement: <Navigate to={PATH.NOT_FOUND} />,

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
          // {
          //   path: ':id',
          //   element: <ArticleDetailPage />,
          // }
        ]
      },
      // {
      //   path: 'create-product',
      //   element: <CreateArticlePage />,
      // },
      // {
      //   path: 'edit-product/:id',
      //   element: <CreateArticlePage />,
      // },
      // {
      //   path: PATH.NOT_FOUND,
      //   element: <NotFoundPage />,
      // }
    ],
  },
]);
