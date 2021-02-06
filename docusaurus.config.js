module.exports = {
  title: 'Kraken CI',
  tagline: 'The same features as in other CI/CD platforms and tools but this time with emphasis on Testing.',
  url: 'https://kraken-ci.github.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'Kraken-CI',
  projectName: 'Kraken-CI.github.io',
  themeConfig: {
    navbar: {
      title: 'Kraken CI',
      logo: {
        alt: 'Kraken Logo',
        src: 'img/logo-big2.svg',
      },
      items: [{
          to: 'docs/philosophy',
          label: 'Philosophy',
          position: 'left'
      }, {
          to: 'docs/',
          //activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
      }, {
          href: 'http://lab.kraken.ci',
          label: 'Demo',
          position: 'left',
      }, {
          to: 'docs/installation',
          label: 'Installation',
          position: 'left',
      }, {
          href: 'https://groups.google.com/g/kraken-ci',
          label: 'Discussion Group',
          position: 'left',
      }, {
          to: 'docs/contrib-kraken',
          //activeBasePath: 'docs',
          label: 'Contributing',
          position: 'left',
//      }, {
//          to: 'blog',
//          label: 'Blog',
//          position: 'left'
      }, {
          href: 'https://github.com/kraken-ci/kraken',
          label: 'GitHub',
          position: 'right',
      }],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: 'docs/',
            },
            {
              label: 'Installation',
              to: 'docs/installation/',
            },
          ],
        },
        {
            title: 'Community',
            items: [{
                label: 'Discussion Group',
                href: 'https://groups.google.com/g/kraken-ci'
            }, {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/kraken-ci',
            },
          ],
        },
        {
          title: 'More',
          items: [
//            {
//              label: 'Blog',
//              to: 'blog',
//            },
            {
              label: 'GitHub',
              href: 'https://github.com/kraken-ci/kraken',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Michal Nowikowski. Built with Docusaurus. Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a href="https://www.flaticon.com">flaticon</a>`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/kraken-ci/website/edit/master/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/kraken-ci/website/edit/master/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
