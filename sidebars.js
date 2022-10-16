module.exports = {
  someSidebar: {
      Introduction: [
          'overview',
          'quick-start',
          'philosophy',
          'features',
          'demo',
          {
              Installation: [
                  'install-docker-compose',
                  'install-helm'
              ]
          },
          'entities',
          'architecture'
      ],
      Usage: [
          'proj-branches',
          'stages',
          'schema',
          'schema-vars',
          'tools',
          'secrets',
          'webhooks',
          'docker-executor',
          'lxd-executor',
          'autoscale-in-cloud',
          {
              'Test Results': [
                  {
                      type: 'doc',
                      id: 'test-results-basics',
                      label: 'Basics'
                  },
                  {
                      type: 'doc',
                      id: 'test-results-tracking',
                      label: 'Tracking'
                  }
              ]
          },
          'kkci'
      ],
      'Testing Frameworks': [
          'tf-junit',
          'tf-pytest',
          'tf-robotframework'
      ],
      Administration: [
          'agents',
          'users',
          'storage'
      ],
      Guides: [
          'guide-intro',
          'guide-autoscale',
          'guide-webhooks',
          'guide-kubernetes'
      ],
      Contributing: [
          'contrib-kraken',
          'dev-guide',
          'contrib-docs',
      ],
      Reference: [
          'schema-ref',
          'server-api'
      ]
  },
};
