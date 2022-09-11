import AlgoritmSelection from 'common/algorithmSelection';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>CPU Scheduler Visualizer</title>
				<meta name='description' content='CPU Scheduler Visualizer' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Placeholder</h1>

				<p className={styles.description}>Placeholder</p>
				<AlgoritmSelection />
			</main>

			<footer className={styles.footer}></footer>
		</div>
	);
};

export default Home;
