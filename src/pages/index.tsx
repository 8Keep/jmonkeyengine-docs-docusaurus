import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const highlights = [
  {
    title: 'Imported Structure',
    body: 'The current Antora wiki structure is mirrored into Docusaurus docs, sidebars, and static assets with stable routes.',
  },
  {
    title: 'Migration Tooling',
    body: 'Importer scripts generate Markdown pages, copy assets, and fail the build when broken links or anchors slip in.',
  },
  {
    title: 'Forum-Inspired Theme',
    body: 'The visual system now follows the dark hub.jmonkeyengine.org palette instead of the earlier light placeholder theme.',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="jMonkeyEngine Docs"
      description="Experimental Docusaurus migration of the jMonkeyEngine wiki">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Docusaurus Migration</p>
            <h1>jMonkeyEngine docs, rebuilt for a simpler static workflow.</h1>
            <p className={styles.lede}>
              This repo is an experimental migration from the Antora-based wiki to a
              Docusaurus site with generated Markdown content, GitHub Pages deployment,
              and a visual system tuned to the jMonkeyEngine forum palette.
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary button--lg" to="/docs/documentation">
                Browse Docs
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/wiki/wiki_admin">
                Migration Notes
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.grid}>
          {highlights.map((item) => (
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
