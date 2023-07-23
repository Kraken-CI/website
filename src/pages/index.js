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
    link: '/docs/test-results',
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
    link: '/docs/test-results',
    description: (
      <>
            Performance testing, obviously. Now with support for multiple iterations,
            statistic analysis (avg, median, stdev, cv and more). And with automatic regression detection.
      </>
    ),
  },
  {
    title: <>Executor Engines</>,
    imageUrl: 'img/power-plant.svg',
    link: '/docs/schema#executors',
    description: (
      <>
          Common way of executing jobs is doing this directly in local system. Beside that Kraken allows for
          execution in containers (Docker or LXD) or in virtual machines (AWS EC2).
      </>
    ),
  },

/*
  {
    title: <>Dynamic tests distribution</>,
    imageUrl: 'img/power-plant.svg',
    link: '/docs/test-results',
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
*/
  {
    title: <>Efficient and standardized pre-commit testing</>,
    imageUrl: 'img/study.svg',
    link: '/docs/test-results',
    description: (
      <>
            Reduced risk of regressions. Developers can test their code with the same tests that are used for product validation. No need for expensive individual bench test environments.
      </>
    ),
  },
  {
    title: <>Broad spectrum of execution environments</>,
    imageUrl: 'img/cpu.svg',
    link: '',
    description: (
      <>
          Testing on a standard hardware is easy. What about automated testing on unstable pre-production hardware platforms?
          Or in an simulation environment, when real hardware is expensive or does not exist? And with a variety of automatically deployed operating systems.
      </>
    ),
  },
  {
    title: <>Cloud & Autoscaling</>,
    imageUrl: 'img/cloud.svg',
    link: '/docs/autoscale-in-cloud',
    description: (
      <>
          Kraken can operate in the cloud. In can be easily deployed to the cloud but also can automatically spawn new executing machines there if the demand is high.
          Currently the autoscaling feature is supported in AWS.
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

function Feature({imageUrl, title, description, link}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
      <a className={clsx('col col--4', styles.feature)} href={link}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </a>
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
            <div className="col col--7">
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
            </div>
            <div className="col col--5">
              <div className={styles.blogPosts}>
                <a href="/blog" style={{ fontSize: '1.3rem', paddingLeft: '16px', fontWeight: 'bold' }}>Recent Blog Posts</a>
                <a href="/blog/conditional-steps"><b>07/23</b> Conditional Steps - 1.3</a>
                <a href="/docs/other-ci-systems"><b>06/14</b> Comparison with CI Competition</a>
                <a href="/blog/data-and-dynamism-in-schema"><b>04/15</b> Data and Dynamism in Schema - 1.1</a>
                <a href="/blog/further-logging-improvements"><b>03/06</b> Further Logging Improvements - 1.0</a>
                <a href="/blog/standing-out-logs-handling"><b>02/06</b> Standing-out Logs Handling</a>
              </div>
            </div>

            <div className="col col--12">
              <div id="mc_embed_signup">
                  <form action="https://kraken.us1.list-manage.com/subscribe/post?u=d06ddd079b1e9d843467ea3ff&amp;id=6cf6b09f66" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className={styles.fsFrm} target="_blank" noValidate>
                      <div id="mc_embed_signup_scroll">
                          <div style={{display: 'flex', justifyContent: 'center'}}>
                              <div className="mc-field-group" style={{width: '40%'}}>
	                          <input type="email" defaultValue="" name="EMAIL" placeholder="Subscribe for email updates" className="required email" id="mce-EMAIL"></input>
                              </div>
                              <div className="clear" style={{width: '15%'}}>
                                  <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"></input>
                              </div>
                          </div>
	                  <div id="mce-responses" className="clear">
		              <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
		              <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
	                  </div>
                          <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
                              <input type="text" name="b_d06ddd079b1e9d843467ea3ff_6cf6b09f66" tabIndex="-1" defaultValue=""></input>
                          </div>
                      </div>
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
