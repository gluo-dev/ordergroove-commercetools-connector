# Create a Deployment

Deployments are created by posting a DeploymentDraft to the Deployments endpoint.

You must include a reference to the Connector that will be deployed (using the Connector's `id` or `key` and `version`), the Region where the deployment will be made, and also the environment variables necessary for the Connector to operate. It is recommended to include a key to identify your Deployment.

```bash
curl --location 'https://connect.us-central1.gcp.commercetools.com/{{ PROJECT-KEY }}/deployments' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{ token }}' \
--data-raw '{
  "key": "ordergroove-connector-deployment",
  "connector": {
    "key": "ordergroove-connector",
    "staged": true,
    "version": 1
  },
  "region": "us-central1.gcp",
  "configurations": [
    {
      "applicationName": "event",
      "standardConfiguration": [
        {
          "key": "CTP_REGION",
          "value": "us-central1.gcp"
        },
        {
            "key": "CTP_LANGUAGE_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_CURRENCY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_COUNTRY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_DISTRIBUTION_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "OG_API_URL",
            "value": "https://restapi.ordergroove.com"
        },
        {
            "key": "PRODUCT_STORE_URL",
            "value": "{{ URL }}"
        }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_PROJECT_KEY",
          "value": "{{ KEY }}"
        },
        {
          "key": "CTP_CLIENT_ID",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_SCOPE",
          "value": "{{ SCOPE }}"
        },
        {
            "key": "OG_API_KEY",
            "value": "{{ SECRET }}"
        }
      ]
    },
    {
      "applicationName": "job",
      "standardConfiguration": [
        {
          "key": "CTP_REGION",
          "value": "us-central1.gcp"
        },
        {
            "key": "CTP_LANGUAGE_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_CURRENCY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_COUNTRY_CODE",
            "value": "{{ CODE }}"
        },
        {
            "key": "CTP_DISTRIBUTION_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "CTP_INVENTORY_SUPPLY_CHANNEL_ID",
            "value": "{{ ID }}"
        },
        {
            "key": "OG_API_URL",
            "value": "https://restapi.ordergroove.com"
        },
        {
            "key": "PRODUCT_STORE_URL",
            "value": "{{ URL }}"
        }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_PROJECT_KEY",
          "value": "{{ KEY }}"
        },
        {
          "key": "CTP_CLIENT_ID",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "{{ SECRET }}"
        },
        {
          "key": "CTP_SCOPE",
          "value": "{{ SCOPE }}"
        },
        {
            "key": "OG_API_KEY",
            "value": "{{ SECRET }}"
        }
      ]
    }
  ]
}'
```

You'll get something like this: TODO update this response

```json
{
  "id": "834bd4ed-b380-4b42-b9d8-bf8dd0a683aa",
  "key": "orium-ct-connect-bloomreach-engagement-deployment",
  "version": 1,
  "connector": {
    "id": "df328165-3684-4d22-8dc9-fc8bd466115b",
    "version": 7,
    "name": "Bloomreach Engagement connector",
    "description": "Bloomreach Engagement connector",
    "creator": {
      "name": "IT",
      "title": "Mr",
      "email": "it@orium.com",
      "company": "Orium"
    },
    "repository": {
      "url": "git@github.com:composable-com/ct-connect-bloomreach-engagement.git",
      "tag": "v1.0.0"
    },
    "configurations": [
      {
        "applicationName": "service",
        "applicationType": "service",
        "standardConfiguration": [
          {
            "key": "CTP_REGION",
            "description": "commercetools Composable Commerce API region"
          }
        ],
        "securedConfiguration": [
          {
            "key": "CTP_PROJECT_KEY",
            "description": "commercetools Composable Commerce project key"
          },
          {
            "key": "CTP_CLIENT_ID",
            "description": "commercetools Composable Commerce client ID"
          },
          {
            "key": "CTP_CLIENT_SECRET",
            "description": "commercetools Composable Commerce client secret"
          },
          {
            "key": "CTP_SCOPE",
            "description": "commercetools Composable Commerce client scope"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_API_KEY",
            "description": "Bloomreach API key"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_API_SECRET",
            "description": "Bloomreach API secret"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN",
            "description": "Bloomreach project token"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE",
            "description": "Bloomreach catalog locale"
          },
          {
            "key": "BASIC_AUTH_SECRET",
            "description": "HTTP basic auth password"
          }
        ]
      },
      {
        "applicationName": "event",
        "applicationType": "event",
        "standardConfiguration": [
          {
            "key": "CTP_REGION",
            "description": "commercetools Composable Commerce API region"
          }
        ],
        "securedConfiguration": [
          {
            "key": "CTP_PROJECT_KEY",
            "description": "commercetools Composable Commerce project key"
          },
          {
            "key": "CTP_CLIENT_ID",
            "description": "commercetools Composable Commerce client ID"
          },
          {
            "key": "CTP_CLIENT_SECRET",
            "description": "commercetools Composable Commerce client secret"
          },
          {
            "key": "CTP_SCOPE",
            "description": "commercetools Composable Commerce client scope"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_API_KEY",
            "description": "Bloomreach API key"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_API_SECRET",
            "description": "Bloomreach API secret"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN",
            "description": "Bloomreach project token"
          },
          {
            "key": "BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE",
            "description": "Bloomreach catalog locale"
          },
          {
            "key": "BASIC_AUTH_SECRET",
            "description": "HTTP basic auth password"
          }
        ]
      }
    ],
    "supportedRegions": ["us-central1.gcp"],
    "certified": false
  },
  "deployedRegion": "us-central1.gcp",
  "applications": [
    {
      "id": "80ca7d5b-78ec-4f58-9aad-7c3fc2975dfa",
      "applicationName": "event",
      "standardConfiguration": [
        { "key": "CTP_REGION", "value": "us-central1.gcp" }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_CLIENT_ID",
          "value": "***"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "***"
        },
        {
          "key": "CTP_PROJECT_KEY",
          "value": "***"
        },
        {
          "key": "CTP_SCOPE",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_API_KEY",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_API_SECRET",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE",
          "value": "*****"
        },
        {
          "key": "BASIC_AUTH_SECRET",
          "value": "***"
        }
      ]
    },
    {
      "id": "773c6714-6081-4976-ab16-f8aff7998f87",
      "applicationName": "service",
      "standardConfiguration": [
        { "key": "CTP_REGION", "value": "us-central1.gcp" }
      ],
      "securedConfiguration": [
        {
          "key": "CTP_CLIENT_ID",
          "value": "***"
        },
        {
          "key": "CTP_CLIENT_SECRET",
          "value": "***"
        },
        {
          "key": "CTP_PROJECT_KEY",
          "value": "***"
        },
        {
          "key": "CTP_SCOPE",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_API_KEY",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_API_SECRET",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_PROJECT_TOKEN",
          "value": "***"
        },
        {
          "key": "BLOOMREACH_ENGAGEMENT_CATALOG_LOCALE",
          "value": "*****"
        },
        {
          "key": "BASIC_AUTH_SECRET",
          "value": "***"
        }
      ]
    }
  ],
  "details": {},
  "preview": true,
  "status": "Deploying"
}
```