import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const sections = [
  {
    title: 'Powerful Graphics',
    body: 'Physically based rendering, post-processing, particles, shadowing, and a low-level renderer close to OpenGL.',
  },
  {
    title: 'Documentation',
    body: 'The migrated wiki content now lives beside the website so engine docs, tutorials, and contributor guides share one shell.',
  },
  {
    title: 'Community',
    body: 'Follow development updates, browse showcase projects, and get help through the forum, blog, and ecosystem links.',
  },
];

const updates = [
  {
    title: 'jMonkeyEngine 3.8.0-stable release',
    body: 'Latest release announcement with links to binaries, release notes, and ongoing 3.9 development.',
    href: '/blog/jme380',
  },
  {
    title: 'Community infrastructure updates',
    body: 'Site and service changes from the old website are now being folded into the unified Docusaurus migration.',
    href: '/blog/new-website',
  },
  {
    title: 'Showcase projects',
    body: 'Games and experiments built with jMonkeyEngine, from sandbox worlds to stylized puzzle and card games.',
    href: '/showcase',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="jMonkeyEngine"
      description="Integrated website and documentation migration for jMonkeyEngine">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>jMonkeyEngine</p>
            <h1>Developer-friendly 3D game development in Java.</h1>
            <p className={styles.lede}>
              This integrated Docusaurus prototype combines the website, news, and
              documentation into one navigable site while keeping the forum-aligned
              visual language from hub.jmonkeyengine.org.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/start">
                Get Started
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/documentation">
                Browse Docs
              </Link>
              <Link className="button button--secondary button--lg" to="/showcase">
                Explore Showcase
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.subgrid}>
          {updates.map((item) => (
            <Link key={item.title} to={item.href} className={clsx(styles.updateCard, 'shadow--md')}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </Link>
          ))}
        </section>
        <section className={styles.grid}>
          {sections.map((item) => (
            <article key={item.title} className={clsx(styles.card, 'shadow--md')}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
