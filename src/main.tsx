import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes/router.tsx'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
)
