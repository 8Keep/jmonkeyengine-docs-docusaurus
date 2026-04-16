import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {showcaseEntries} from '@site/src/data/showcase';
import styles from './showcase.module.css';

export default function Showcase(): JSX.Element {
  return (
    <Layout title="Showcase" description="Games and projects built with jMonkeyEngine">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Showcase</p>
            <h1>Projects built with jMonkeyEngine.</h1>
            <p className={styles.lede}>
              Built with jMonkeyEngine in production, these projects span sandbox worlds,
              tactics-heavy dungeon crawlers, puzzle games, and online-first experiments.
            </p>
          </div>
        </section>
        <section className={styles.grid}>
          {showcaseEntries.map((entry) => (
            <Link key={entry.slug} to={`/showcase/${entry.slug}`} className={clsx(styles.card, 'shadow--md')}>
              <img src={entry.cover} alt={entry.title} className={styles.cardImage} />
              <div className={styles.cardBody}>
                <h2>{entry.title}</h2>
                <p>{entry.tagline}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
