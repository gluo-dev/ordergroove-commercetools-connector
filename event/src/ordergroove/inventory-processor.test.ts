import { jest } from '@jest/globals'

import { processInventoryEntryEvent } from './inventory-processor'
import * as InventoryEntryProcessor from './inventory-processor'
import * as OgProductsApi from './client/og-products-api'
import * as CtService from './services/ct-service'
import {
  mockInventoryEntryDeletedEventPayload,
  mockOgProductApiResponse,
  mockProductVariantOutOfStock
} from './mocks/mocks'

jest.mock('./client/og-products-api', () => {
  return {
    retrieveOgProduct: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200,
        product: {
          product_id: 'ABC123',
          sku: 'ABC123',
          name: 'Test Product',
          price: 100,
          live: true,
          image_url: 'https://image-url.com',
          detail_url: ''
        }
      }
    ),
    updateProducts: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200
      }
    ),
  }
})

jest.mock('./services/ct-service', () => {
  return {
    getProductVariantBySku: jest.fn().mockReturnValue(
      {
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
    )
  }
})

describe('processInventoryEntryEvent', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should update the live attribute in ordergroove', async () => {
    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryEntryProcessor, 'processInventoryEntryEvent')

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')
      .mockImplementation(() => Promise.resolve(mockProductVariantOutOfStock))
      .mockResolvedValue(mockProductVariantOutOfStock)

    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processInventoryEntryEvent(mockInventoryEntryDeletedEventPayload)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalled()
  })

  it('should not update the live attribute in ordergroove', async () => {
    const processInventoryEntryEventSpy = jest
      .spyOn(InventoryEntryProcessor, 'processInventoryEntryEvent')

    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const getProductVariantBySkuSpy = jest
      .spyOn(CtService, 'getProductVariantBySku')
      .mockImplementation(() => Promise.resolve(mockProductVariantOutOfStock))
      .mockResolvedValue(mockProductVariantOutOfStock)

    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    await processInventoryEntryEvent(mockInventoryEntryDeletedEventPayload)

    expect(processInventoryEntryEventSpy).toHaveBeenCalled()
    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(updateProductsSpy).toHaveBeenCalledTimes(0)
  })
})