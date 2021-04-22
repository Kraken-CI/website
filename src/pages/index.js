import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const recentPosts = require("../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json");


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
      title={`Modern CI/CD System focused on Testing`}
      description="Modern CI/CD System focused on Testing">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <div className="row" style={{ alignItems: 'center' }}>
            <div className="col col--6">
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
            <div className="col col--3">
              <div style={{ textAlign: 'left', margin: '0 0 0 5rem' }}>
                <div style={{ fontSize: '1.3rem', paddingLeft: '16px' }}>
                Recent Blog Posts
                </div>
                <ul style={{ fontSize: '1.2rem', listStyleType: 'disclosure-closed' }}>
                  {recentPosts.items.slice(0, 5).map((item, index) => (
                     <li key={index}>
                          { item.date }
                     <a href={`${item.permalink}`} style={{ color: 'white' }}>{item.title}</a>{" "}
                  </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col col--3">
              <div style={{ padding: '0 0 0 4em'}}>
                <form className={styles.fsFrm} name="newsletter-form" acceptCharset="utf-8" action="https://formspree.io/f/mwkwjvvp" method="post">
                  <input type="email" name="_replyto" id="email-address" placeholder="email@domain" required=""></input>
                  <input type="hidden" name="_subject" id="email-subject" value="Subscribe Newsletter"></input>
                  <input type="submit" value="Subscribe to Newsletter"></input>
                </form>
              </div>
            </div>
          </div>

          <div className="row" style={{ height: '330px', alignItems: 'center' }} id="slideshow-box">
            <div className="slideshow">
              <img
                src={useBaseUrl('img/slide-main.png')}
                className="splashScreen" />
              <img
                src={useBaseUrl('img/slide-branch-results.png')}
                className="splashScreen"
              />
              <img
                src={useBaseUrl('img/screen-run-test-results.png')}
                className="splashScreen"
              />
              <img
                src={useBaseUrl('img/slide-branch-mgmt.png')}
                className="splashScreen"
              />
              <img
                src={useBaseUrl('img/slide-run.png')}
                className="splashScreen"
              />
              <img
                src={useBaseUrl('img/slide-charts.png')}
                className="splashScreen"
              />
            </div>
            <div className="shadow" />
          </div>

        </div>
      </header>

          <div style={{
              textAlign: 'center',
              fontSize: '1.8em',
              margin: '20px auto 30px auto'
          }}>
          Mission: deliver a modern, open-source, on-premise CI/CD system <br/> that is highly scalable and focused on testing.
      </div>

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
