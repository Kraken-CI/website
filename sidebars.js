module.exports = {
    someSidebar: [{
        label: 'Introduction',
        type: 'category',
        items: [
            'overview',
            'quick-start',
            'philosophy',
            'features',
            'demo',
            {
                Installation: [
                    'install-docker-compose',
                    'install-helm',
                    'install-manual'
                ]
            },
            'entities',
            'architecture'
        ]
    }, {
        label: 'Usage',
        type: 'category',
        items: [
            'proj-branches',
            'stages',
            'schema',
            'schema-data',
            'env-vars',
            'secrets',
            'docker-executor',
            'lxd-executor',
            'notifications',
            'webhooks',
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
            'tools',
            'kkci',
            'migration'
        ]
    }, {
        label: 'Testing Frameworks',
        type: 'category',
        items: [
            'tf-junit',
            'tf-pytest',
            'tf-robotframework'
        ]
    }, {
        label: 'Administration',
        type: 'category',
        items: [
            'agents',
            'users',
            'storage'
        ]
    }, {
        label: 'Guides',
        type: 'category',
        items: [
            'guide-intro',
            'guide-autoscale',
            'guide-webhooks',
            'guide-kubernetes'
        ]
    }, {
        label: 'Competition',
        type: 'category',
        items: [
            'others',
            'other-ci-systems',
            'other-test-results-analysis-tools'
        ]
    }, {
        label: 'Contributing',
        type: 'category',
        items: [
            'contrib-kraken',
            'dev-guide',
            'contrib-docs',
        ]
    }, {
        label: 'Reference',
        type: 'category',
        items: [
          'schema-ref',
            'server-api'
        ]
    }]
};
