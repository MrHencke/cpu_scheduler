import styles from '../styles/Home.module.css'
import AlgoritmSelection from 'common/components/algorithmSelection'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>CPU Scheduling Algorithm Visualizer</title>
				<meta name="description" content="CPU Scheduling Algorithm Visualizer" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.title}>CPU Scheduling Algorithm Visualizer</h1>

				<AlgoritmSelection />
			</main>

			<footer className={styles.footer}>
				<span>
					Made by <a href="https://hencke.dev">Hencke.dev</a>
				</span>
				<a href="https://github.com/mrhencke">GitHub</a>
			</footer>
		</div>
	)
}

export default Home
