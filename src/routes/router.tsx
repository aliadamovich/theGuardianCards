import App from '@/app/App';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATH } from '@/routes/Paths';
import { ArticlesPage } from '@/features/articles/ui/ArticlesPage';
import { SingleArticlePage } from '@/features/articles/ui/singleArticlePage/SingleArticlePage';



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
          {
            path: ':id',
            element: <SingleArticlePage />,
          }
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
