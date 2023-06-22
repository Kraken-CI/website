import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import { useBlogPost } from '@docusaurus/theme-common/internal';
import { DiscussionEmbed } from 'disqus-react';

export default function FooterWrapper(props) {
  const post = useBlogPost().metadata;
  console.info('props', post);
  return (
      <>
          <br/>

          <DiscussionEmbed
              shortname='kraken-ci'
              config={{
                 url: 'https://kraken.ci' + post.permalink,
                 identifier: 'blog-' + post.frontMatter.slug,
                 title: 'Blog - ' + post.title,
              }}
          />
          
          <Footer {...props} />
    </>
  );
}
