module.exports = {
  title: 'Kraken CI',
  tagline: 'The same features as in other CI/CD platforms and tools but this time with emphasis on Testing.',
  url: 'https://kraken.ci',
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
          to: 'docs/quick-start',
          label: 'Quick Start',
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
      }, {
          to: 'blog',
          label: 'Blog',
          position: 'left'
      }, {
          href: 'https://github.com/sponsors/godfryd',
          label: 'Sponsor Us',
          position: 'right',
          className: 'navbar-sponsor-item'
      }, {
          to: 'support',
          label: 'Support',
          position: 'right',
      }, {
          to: 'contact',
          label: 'Contact',
          position: 'right',
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
            title: 'Business',
            items: [{
                label: 'Support',
                to: 'support'
            }, {
                label: 'Contact',
                to: 'contact',
            }, {
                label: 'Privacy Policy',
                to: 'privacy-policy',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/kraken-ci/kraken',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/kraken-ci',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} <a href="mailto:mike@kraken.ci">Michal Nowikowski</a>. Built with Docusaurus. Icons made by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> from <a href="https://www.flaticon.com">flaticon</a>`,
    },
    colorMode: {
      disableSwitch: true
    },
    algolia: {
      apiKey: '6a41a86ec4ae3fccccf20ff159f4b7ef',
      indexName: 'kraken'

      // Optional: see doc section below
      // contextualSearch: true,

      // Optional: see doc section below
      // appId: 'YOUR_APP_ID',

      // Optional: Algolia search parameters
      // searchParameters: {},

      //... other Algolia params
    },
  },
  plugins: [
      "@docusaurus/plugin-ideal-image",
      ["@docusaurus/plugin-client-redirects",
       {
           redirects: [
               {
                   to: '/docs/install-docker-compose',
                   from: '/docs/installation',
               },
               {
                   to: '/docs/test-results-basics',
                   from: '/docs/test-results',
               },
           ],
       },
      ],
  ],
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
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-152860048-1',
          anonymizeIP: true,
        },
      },
    ],
  ],
};
