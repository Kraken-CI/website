import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Pass or fail? More</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
            Failures are boring, now observe regressions and fixes, see behavior of test cases over time on charts.
            Look on changes, compare with previous results. Unstable tests are marked.
      </>
    ),
  },
  {
    title: <>More dimentions to results</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
            Performance testing, obviously. Now with support for multiple iterations,
            statistic analysis (avg, median, stdev, cv and more). And with automatic regression detection.
      </>
    ),
  },
  {
    title: <>Dynamic tests distribution</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
            Execution machines are fully utilized. We use dynamic division of your tests content
            and spread it to many machines to provide a feedback to you as quickly as possible.
      </>
    ),
  },
/*
  {
    title: <></>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
            Do pre-commit testing for your PR or MR branch. Compare results with reference ones from CI.
            Spot quickly regressions and do not enter them to master branch.
      </>
    ),
  },
*/
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

          <img src="img/kraken-diagram.png" style={{ margin: '20px auto 50px', display: 'block' }}></img>
    </Layout>
  );
}

export default Home;
