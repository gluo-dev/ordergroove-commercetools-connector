import * as CtService from './ct-service'
import { getProductVariantBySku } from './ct-service'
import * as CtProductsApi from '../client/ct-products-api'
import { mockProductProjectionPagedQueryResponse } from '../mocks/mocks'

jest.mock('../client/ct-products-api', () => {
  return {
    getProductProjections: jest.fn().mockReturnValue(
      {
        "count": 1,
        "limit": 100,
        "offset": 0,
        "results": [
          {
            "categories": [
              {
                "id": "11111",
                "typeId": "category"
              }
            ],
            "categoryOrderHints": {},
            "createdAt": "2023-12-07T23:38:56.776Z",
            "description": {
              "en-US": "Woman formal jeans"
            },
            "hasStagedChanges": false,
            "id": "22222",
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
              "sku": "WFJS",
              "availability": {
                "isOnStock": true,
                "availableQuantity": 100
              }

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
              "id": "33333",
              "typeId": "product-type"
            },
            "published": true,
            "searchKeywords": {},
            "slug": {
              "en-US": "woman-formal-jeans"
            },
            "taxCategory": {
              "id": "44444",
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
                "availability": {
                  "isOnStock": true,
                  "availableQuantity": 100
                },
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
    )
  }
})

describe('getProductVariantBySku', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the commercetools product projections API and get a product', async () => {
    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')

    const getProductProjectionsSpy = jest
      .spyOn(CtProductsApi, 'getProductProjections')
      .mockImplementation(() => Promise.resolve(mockProductProjectionPagedQueryResponse))
      .mockResolvedValue(mockProductProjectionPagedQueryResponse)

    const result = await getProductVariantBySku('WFJM')

    expect(getProductVariantBySku).toHaveBeenCalled()
    expect(getProductProjectionsSpy).toHaveBeenCalled()
  })
})