import { BrowserRouter, Outlet } from "react-router-dom"
import { ArticlesPage } from "../features/products/ui/ArticlesPage"
import s from './styles/App.module.scss'

function App() {

  return (
		<div className={s.appContainer}>
			<header className={s.header}>header</header>
			<main><Outlet /></main>
			<footer>footer</footer>
		</div>
  )
}

export default App
