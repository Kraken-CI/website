import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import { useDoc } from '@docusaurus/theme-common/internal';
import { DiscussionEmbed } from 'disqus-react';

export default function FooterWrapper(props) {
  const doc = useDoc().metadata;
  console.info('props', doc);
  return (
      <>
          <br/>

          <DiscussionEmbed
              shortname='kraken-ci'
              config={{
                 url: 'https://kraken.ci' + doc.permalink,
                 identifier: 'docs-' + doc.id,
                 title: 'Docs - ' + doc.title,
              }}
          />

          <Footer {...props} />
      </>
  );
}
