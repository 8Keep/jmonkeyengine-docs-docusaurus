import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './showcase.module.css';

const showcaseEntries = [
  {
    title: 'Collect The 10s',
    image: '/images/showcase/c10/0.webp',
    href: 'https://collectthe10s.com/',
    body: 'A playing card game brought into a 3D space, focused on online play, rankings, and strong AI opponents.',
  },
  {
    title: 'Skullstone',
    image: '/images/showcase/skullstone/7.jpg',
    href: 'http://skullstonegame.com/',
    body: 'A retro grid-based dungeon crawler RPG inspired by classic party-based dungeon exploration games.',
  },
  {
    title: 'Mythruna',
    image: '/images/showcase/mythruna/11.jpg',
    href: 'https://mythruna.com/',
    body: 'An open-ended sandbox RPG focused on building, exploration, and large persistent worlds.',
  },
  {
    title: 'Spoxel',
    image: '/images/showcase/spoxel/7.jpg',
    href: 'https://github.com/paul-speed/spoxel',
    body: 'A voxel project that shows the flexibility of jMonkeyEngine for stylized procedural environments.',
  },
  {
    title: 'Depthris',
    image: '/images/showcase/depthris/1.webp',
    href: 'https://jmonkeyengine.org/tags/showcase',
    body: 'A puzzle game showcase entry demonstrating how small, polished games can be built with the engine.',
  },
  {
    title: 'LS Frontier',
    image: '/images/showcase/ls_frontier/5.jpg',
    href: 'https://jmonkeyengine.org/tags/showcase',
    body: 'A showcase project featuring sci-fi environments and a more cinematic visual direction.',
  },
];

export default function Showcase(): JSX.Element {
  return (
    <Layout title="Showcase" description="Games and projects built with jMonkeyEngine">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Showcase</p>
            <h1>Projects built with jMonkeyEngine.</h1>
            <p className={styles.lede}>
              A first integrated pass of the old website showcase content while the
              dedicated project pages are migrated.
            </p>
          </div>
        </section>
        <section className={styles.grid}>
          {showcaseEntries.map((entry) => (
            <a key={entry.title} href={entry.href} className={clsx(styles.card, 'shadow--md')}>
              <img src={entry.image} alt={entry.title} className={styles.cardImage} />
              <div className={styles.cardBody}>
                <h2>{entry.title}</h2>
                <p>{entry.body}</p>
              </div>
            </a>
          ))}
        </section>
      </main>
    </Layout>
  );
}
