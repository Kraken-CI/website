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
    imageUrl: 'img/trend.svg',
    description: (
      <>
            Failures are boring, now observe regressions and fixes, see behavior of test cases over time on charts.
            Look at changes, compare with previous results. Unstable tests are automatically identified and marked.
      </>
    ),
  },
  {
    title: <>More dimensions to results</>,
    imageUrl: 'img/presentation.svg',
    description: (
      <>
            Performance testing, obviously. Now with support for multiple iterations,
            statistic analysis (avg, median, stdev, cv and more). And with automatic regression detection.
      </>
    ),
  },
  {
    title: <>Dynamic tests distribution</>,
    imageUrl: 'img/power-plant.svg',
    description: (
      <>
            Execution machines are fully utilized. We use dynamic division of your tests content
            and spread it to many machines to provide a feedback to you as quickly as possible.
      </>
    ),
  },
  {
    title: <>Realtime insight into product quality</>,
    imageUrl: 'img/insight.svg',
    description: (
      <>
            Quality of each build is clearly visible through dashboards and evaluated against release criteria.
            Release tools can be integrated into the workflow, so qualified builds are ready to go to the customer.
      </>
    ),
  },
  {
    title: <>Efficient and standardized pre-commit testing</>,
    imageUrl: 'img/study.svg',
    description: (
      <>
            Reduced risk of regressions. Developers can test their code with the same tests that are used for product validation. No need for expensive individual bench test environments.
      </>
    ),
  },
  {
    title: <>Broad spectrum of execution environments</>,
    imageUrl: 'img/cpu.svg',
    description: (
      <>
            Testing on a standard hardware is easy. What about automated testing on unstable pre-production hardware platforms? 
            Or in an simulation environment, when real hardware is expensive or does not exist? And with a variety of automatically deployed operating systems.
      </>
    ),
  },

/*
  {
    title: <></>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
            Do pre-commit testing for your PR or MR branch. Easily choose tests and their scope. Compare results with reference ones from CI.
            Spot regressions quickly and do not let them get into production branch.
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
