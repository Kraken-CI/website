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
// commented out as navbar is too crowded
//          to: 'docs/philosophy',
//          label: 'Philosophy',
//          position: 'left'
//      }, {
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
          to: 'blog',
          label: 'Blog',
          position: 'left'
      }, {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [{
              to: '/docs/contrib-kraken',
              //activeBasePath: 'docs',
              label: 'Contributing'
          }, {
              href: 'https://discord.gg/jUvSZ4S5m3',
              label: 'Discord Server',
          }, {
              href: 'https://github.com/Kraken-CI/kraken/discussions',
              label: 'GitHub Discussions',
          }, {
              href: 'https://groups.google.com/g/kraken-ci',
              label: 'Google Discussion Group'
          }]
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
      }, {
          href: 'https://github.com/Kraken-CI/kraken/releases',
          label: 'Download',
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
              label: 'Quick Start',
              to: '/docs/quick-start/',
            },
            {
              label: 'Usage',
              to: '/docs/proj-branches/',
            },
            {
              label: 'Administration',
              to: '/docs/agents/',
            },
            {
              label: 'Guides',
              to: '/docs/guide-intro/',
            },
            {
              label: 'Reference',
              to: '/docs/schema-ref/',
            },
          ],
        },
        {
            title: 'Community',
            items: [{
                to: '/docs/contrib-kraken',
                //activeBasePath: 'docs',
                label: 'Contributing'
            }, {
                href: 'https://discord.gg/bEw7Pemn',
                label: 'Discord Server',
            }, {
                href: 'https://github.com/Kraken-CI/kraken/discussions',
                label: 'GitHub Discussions',
            }, {
                href: 'https://groups.google.com/g/kraken-ci',
                label: 'Google Discussion Group'
            }],
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
      appId: 'YHIPSVOLK3',
      apiKey: '15e0805c14af0bfb8b052b69f93da8ec',
      indexName: 'kraken'

      // Optional: see doc section below
      // contextualSearch: true,

      // Optional: see doc section below
      // appId: 'YOUR_APP_ID',

      // Optional: Algolia search parameters
      // searchParameters: {},

      //... other Algolia params
    },
    prism: {
        additionalLanguages: ['shell-session'],
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
        gtag: {
          trackingID: [
              'UA-152860048-1',
              'G-XH68RHQVEL'
          ],
          anonymizeIP: true,
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      },
    ],
  ],
};
