import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Support() {
  return (
      <Layout title="Support">
        <div className="container" style={{
                 marginTop: '60px',
             }}>

          <div class="row">
            <h1 style={{
                    margin: '0 auto',
                }}>Premium Support</h1>
          </div>

          <div class="row" style={{
                    margin: '30px 0',
               }}>
            <div style={{
                     margin: '0 auto',
                     fontSize: '1.2em',
               }}>
              Use our expertise in designing and implementing CI/CD solutions.
            </div>
          </div>

          <div class="row" style={{
                   marginTop: '40px',
               }}>
            <div className={clsx('col col--offset-1 col--4')}>
              <h2>
                <img src={useBaseUrl('img/services.svg')} style={{
                         width: "60px",
                         verticalAlign: 'middle',
                         paddingRight: '30px',
                     }}/>
                Onboarding
              </h2>
              Get help from us to quickly ramp up and get to full speed to use full potential of Kraken CI.
            </div>
            <div className={clsx('col col--offset-1 col--4')}>
              <h2>
                <img src={useBaseUrl('img/web-development.svg')} style={{
                         width: "60px",
                         verticalAlign: 'middle',
                         paddingRight: '30px',
                     }}/>
                Developer Training
              </h2>
              Let us train your developer and validation teams to allow them using Kraken CI effectivelly.
            </div>
          </div>

          <div class="row" style={{
                   marginTop: '40px',
               }}>
            <div className={clsx('col col--offset-1 col--4')}>
              <h2>
                <img src={useBaseUrl('img/customer.svg')} style={{
                         width: "60px",
                         verticalAlign: 'middle',
                         paddingRight: '30px',
                     }}/>
                Operator Training
              </h2>
              Empower you administrators. Let us show how to efficently maintain
              Kraken CI infrastructure and how to debug and solve issues.
            </div>
            <div className={clsx('col col--offset-1 col--4')}>
              <h2>
                <img src={useBaseUrl('img/branding.svg')} style={{
                         width: "60px",
                         verticalAlign: 'middle',
                         paddingRight: '30px',
                     }}/>
                Configuration Migration
              </h2>
              If you already have a working CI solution we can help with
              migrating it Kraken CI.
            </div>
          </div>

          <div class="row" style={{
                   margin: '40px 0 0 0',
                   padding: '30px 0',
               }}>
            <h2 style={{
                    margin: '0 auto',
                }}>Support Inquiry</h2>
          </div>

          <div class="row" style={{
                   margin: '0 0 40px 0',
               }}>
            <form className={clsx('col col--offset-2 col--8', styles.fsFrm)} name="simple-contact-form" accept-charset="utf-8" action="https://formspree.io/f/mwkwjvvp" method="post">
              <fieldset id="fs-frm-inputs">
                <label for="full-name">Full Name</label>
                <input type="text" name="name" id="full-name" placeholder="First and Last" required=""></input>
                <label for="email-address">Email Address</label>
                <input type="email" name="_replyto" id="email-address" placeholder="email@domain.tld" required=""></input>
                <label for="message">Message</label>
                <textarea rows="5" name="message" id="message" placeholder="A message..." required=""></textarea>
                <input type="hidden" name="_subject" id="email-subject" value="Support Inquiry"></input>
              </fieldset>
              <input type="submit" value="Send"></input>
            </form>
          </div>

          <div class="row" style={{
                   margin: '0 0 40px 0',
               }}>
            <div style={{
                     margin: '0 auto'
                 }}>
              You can also contact us directly via email: <a href="mailto:mike@kraken.ci">mike@kraken.ci</a>.
            </div>
          </div>

        </div>
      </Layout>
  );
}

export default Support;
