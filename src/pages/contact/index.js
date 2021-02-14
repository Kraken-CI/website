import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

function Contact() {
  return (
      <Layout title="Contact">
        <div className="container" style={{
                 marginTop: '60px',
             }}>
          <div class="row">
          <div className={clsx('col col--6')}>
            <h1>Contact Us</h1>

            <p style={{
                   fontSize: '3em',
                   lineHeight: '1.1em',
                   margin: '50px 0',
               }}>
              Looking to learn more? <br/>
              Send us a message. <br/>
              We will get back to you!
            </p>

            <p style={{
                   fontSize: '1.2em',
               }}>
            Whether you want a personal demo or have questions about how CI/CD can help your organization, we are ready to help.
            </p>

            <p style={{
                   fontSize: '1.2em',
               }}>
              You can also send us an email directly: <a href="mailto:mike@kraken.ci">mike@kraken.ci</a>.
            </p>

          </div>

          <div className={clsx('col col--1')}>
          </div>

          <form className={clsx('col col--5', styles.fsFrm)} name="simple-contact-form" accept-charset="utf-8" action="https://formspree.io/f/mwkwjvvp" method="post">
            <fieldset id="fs-frm-inputs">
              <label for="full-name">Full Name</label>
              <input type="text" name="name" id="full-name" placeholder="First and Last" required=""></input>
              <label for="email-address">Email Address</label>
              <input type="email" name="_replyto" id="email-address" placeholder="email@domain.tld" required=""></input>
              <label for="message">Message</label>
              <textarea rows="5" name="message" id="message" placeholder="A message..." required=""></textarea>
              <input type="hidden" name="_subject" id="email-subject" value="Contact Form Submission"></input>
            </fieldset>
            <input type="submit" value="Send"></input>
          </form>
          </div>
        </div>
      </Layout>
  );
}

export default Contact;
