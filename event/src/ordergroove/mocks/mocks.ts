import { ProductProjectionPagedQueryResponse, ProductVariant } from '@commercetools/platform-sdk'

import { OrdergrooveProduct, OrdergrooveApiResponse, CtEventPayload } from '../../types/custom.types';

export const mockOgProduct: OrdergrooveProduct = {
  product_id: 'ABC123',
  sku: 'ABC123',
  name: 'Test product',
  price: 100.00,
  live: true,
  image_url: 'https://image-url.com',
  detail_url: ''
};

export const mockOgProducts: OrdergrooveProduct[] = [
  {
    product_id: 'ABC123',
    sku: 'ABC123',
    name: 'Test product',
    price: 100.00,
    live: true,
    image_url: 'https://image-url.com',
    detail_url: ''
  }
];

export const mockOgProductApiResponse: OrdergrooveApiResponse = {
  success: true,
  status: 200,
  product: mockOgProduct
}

export const mockProductProjectionPagedQueryResponse: ProductProjectionPagedQueryResponse = {
  "count": 1,
  "limit": 100,
  "offset": 0,
  "results": [
    {
      "categories": [
        {
          "id": "fc072771-b478-4587-ab56-f3b227507cc1",
          "typeId": "category"
        }
      ],
      "categoryOrderHints": {},
      "createdAt": "2023-12-07T23:38:56.776Z",
      "description": {
        "en-US": "Woman formal jeans"
      },
      "hasStagedChanges": false,
      "id": "942a49cb-9ec9-4d72-8a89-672f8d9ad8df",
      "key": "woman-formal-jeans",
      "lastModifiedAt": "2023-12-07T23:39:03.450Z",
      "masterVariant": {
        "assets": [],
        "attributes": [
          {
            "name": "woman-jeans-color-attribute",
            "value": {
              "key": "black",
              "label": "Black"
            }
          }
        ],
        "id": 1,
        "images": [],
        "key": "woman-formal-jeans-s",
        "prices": [],
        "sku": "WFJS"
      },
      "metaDescription": {
        "en-US": ""
      },
      "metaTitle": {
        "en-US": ""
      },
      "name": {
        "en-US": "Woman formal jeans"
      },
      "priceMode": "Embedded",
      "productType": {
        "id": "36754d8a-5e40-46fc-872a-58bd9795d8b4",
        "typeId": "product-type"
      },
      "published": true,
      "searchKeywords": {},
      "slug": {
        "en-US": "woman-formal-jeans"
      },
      "taxCategory": {
        "id": "cdb0601d-2a50-4db8-a719-4a337b7da385",
        "typeId": "tax-category"
      },
      "variants": [
        {
          "assets": [],
          "attributes": [
            {
              "name": "woman-jeans-color-attribute",
              "value": {
                "key": "black",
                "label": "Black"
              }
            }
          ],
          "id": 2,
          "images": [],
          "key": "woman-formal-jeans-m",
          "prices": [],
          "sku": "WFJM"
        }
      ],
      "version": 2
    }
  ],
  "total": 1
}

export const mockProductCtEventPayload: CtEventPayload = {
  notificationType: 'Message',
  projectKey: 'project-key',
  id: '12345',
  version: 1,
  sequenceNumber: 123,
  resource: {
    typeId: 'product',
    id: '123'
  },
  resourceVersion: 1,
  type: 'ProductPublished',
  productProjection: {
    "id": "11111",
    "version": 5,
    "productType": {
      "typeId": "product-type",
      "id": "22222"
    },
    "name": {
      "en-US": "Product"
    },
    "description": {
      "en-US": "This product"
    },
    "categories": [
      {
        "typeId": "category",
        "id": "33333"
      }
    ],
    "categoryOrderHints": {},
    "slug": {
      "en-US": "product"
    },
    "masterVariant": {
      "id": 1,
      "sku": "PR-1",
      "prices": [
        {
          "id": "12345",
          "value": {
            "type": "centPrecision",
            "currencyCode": "USD",
            "centAmount": 399,
            "fractionDigits": 2
          },
          "country": "US"
        }
      ],
      "images": [
        {
          "url": "https://image.com",
          "dimensions": {
            "w": 5056,
            "h": 4784
          }
        }
      ],
      "attributes": [],
      "assets": [],
      "availability": {
        "isOnStock": true,
        "availableQuantity": 100
      }
    },
    "variants": [],
    "searchKeywords": {},
    "hasStagedChanges": false,
    "published": true,
    "key": "my-product",
    "taxCategory": {
      "typeId": "tax-category",
      "id": "12345asdfg"
    },
    "createdAt": "2023-11-27T16:37:54.212Z",
    "lastModifiedAt": "2023-11-29T19:28:24.534Z"
  },
  createdAt: '2023-11-29T21:51:17.902Z',
  lastModifiedAt: '2023-11-29T21:51:17.902Z',
  createdBy: { "clientId": "1q1q1q1q1q" },
  lastModifiedBy: { "clientId": "1q1q1q1q1q" }
}

export const mockInventoryEntryDeletedEventPayload: CtEventPayload = {
  createdAt: "2023-12-20T00:59:57.569Z",
  id: "12345-ABCDE",
  lastModifiedAt: "2023-12-20T00:59:57.569Z",
  notificationType: "Message",
  projectKey: "project-key",
  resource: {
    "id": "11111",
    "typeId": "inventory-entry"
  },
  resourceUserProvidedIdentifiers: {
    "sku": "WFJM"
  },
  resourceVersion: 2,
  sequenceNumber: 2,
  sku: "WFJM",
  supplyChannel: {
    "id": "11111",
    "typeId": "channel"
  },
  type: "InventoryEntryDeleted",
  version: 1,
  createdBy: { "clientId": "1q1q1q1q1q" },
  lastModifiedBy: { "clientId": "1q1q1q1q1q" }
}

export const mockProductVariantWithStock: ProductVariant = {
  "id": 1,
  "sku": "WFJM",
  "prices": [
    {
      "id": "12345",
      "value": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 399,
        "fractionDigits": 2
      },
      "country": "US"
    }
  ],
  "images": [
    {
      "url": "https://image.com",
      "dimensions": {
        "w": 5056,
        "h": 4784
      }
    }
  ],
  "attributes": [],
  "assets": [],
  "availability": {
    "isOnStock": true,
    "availableQuantity": 100
  }
}

export const mockProductVariantOutOfStock: ProductVariant = {
  "id": 1,
  "sku": "WFJM",
  "prices": [
    {
      "id": "12345",
      "value": {
        "type": "centPrecision",
        "currencyCode": "USD",
        "centAmount": 399,
        "fractionDigits": 2
      },
      "country": "US"
    }
  ],
  "images": [
    {
      "url": "https://image.com",
      "dimensions": {
        "w": 5056,
        "h": 4784
      }
    }
  ],
  "attributes": [],
  "assets": [],
  "availability": {
    "isOnStock": false,
    "availableQuantity": 0
  }
}