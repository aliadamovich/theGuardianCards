import { Outlet } from "react-router-dom"
import s from './styles/App.module.scss'

function App() {
  return (
		<div className={s.appContainer}>
			<header className={s.header}></header>
			<main className={s.main}>
				<Outlet />
			</main>
			<footer className={s.footer}>© Alesya Adamovich</footer>
		</div>
  )
}

export default App
