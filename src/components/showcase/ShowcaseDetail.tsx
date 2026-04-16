import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './ShowcaseDetail.module.css';
import type {ShowcaseEntry} from '@site/src/data/showcase';

function renderMediaItem(item: string, title: string) {
  if (item.startsWith('youtube:')) {
    const id = item.slice('youtube:'.length);
    return (
      <iframe
        key={item}
        className={styles.mediaFrame}
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={`${title} video ${id}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (item.endsWith('.webm')) {
    return <video key={item} className={styles.mediaVideo} src={item} controls preload="metadata" />;
  }

  return <img key={item} className={styles.mediaImage} src={item} alt={title} loading="lazy" />;
}

export default function ShowcaseDetail({entry}: {entry: ShowcaseEntry}): JSX.Element {
  return (
    <Layout title={entry.title} description={entry.tagline}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <img className={styles.heroImage} src={entry.cover} alt={entry.title} />
            <div className={styles.heroBody}>
              <p className={styles.eyebrow}>Showcase</p>
              <h1>{entry.title}</h1>
              <p className={styles.tagline}>{entry.tagline}</p>
              <div className={styles.links}>
                <Link className="button button--primary" to="/showcase">
                  Back to Showcase
                </Link>
                {entry.links.map((link) => (
                  <a key={link.href} className="button button--secondary" href={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className={styles.content}>
          <article className={styles.copy}>
            <h2>About This Project</h2>
            {entry.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
          <aside className={styles.gallery}>
            <h2>Gallery</h2>
            <div className={styles.mediaGrid}>{entry.gallery.map((item) => renderMediaItem(item, entry.title))}</div>
          </aside>
        </section>
      </main>
    </Layout>
  );
}
