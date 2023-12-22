import { jest } from '@jest/globals'

import { retrieveOgProduct, createProducts, updateProducts } from './og-products-api'
import * as OgProductsApi from './og-products-api'
import { mockOgProductApiResponse, mockOgProduct } from '../mocks/mocks'

process.env.OG_API_KEY = 'APIKEY'

jest.mock('./og-products-api', () => {
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
    createProducts: jest.fn().mockReturnValue(
      {
        success: true,
        status: 200
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

describe('retrieveOgProduct', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the Retrieve product API in ordergroove', async () => {
    const retrieveOgProductSpy = jest
      .spyOn(OgProductsApi, 'retrieveOgProduct')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const result = await retrieveOgProduct('ABC123', 'qwe123')

    expect(retrieveOgProductSpy).toHaveBeenCalled()
    expect(result.success).toBe(true)
    expect(result.product?.product_id).toBe('ABC123')
  })

  it('should call the Create product API in ordergroove', async () => {
    const createProductsSpy = jest
      .spyOn(OgProductsApi, 'createProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const products = new Array()
    products.push(mockOgProduct)
    const result = await createProducts(products, 'qwe123')

    expect(createProductsSpy).toHaveBeenCalled()
    expect(result.success).toBe(true)
  })

  it('should call the Update product API in ordergroove', async () => {
    const updateProductsSpy = jest
      .spyOn(OgProductsApi, 'updateProducts')
      .mockImplementation(() => Promise.resolve(mockOgProductApiResponse))
      .mockResolvedValue(mockOgProductApiResponse)

    const products = new Array()
    products.push(mockOgProduct)
    const result = await updateProducts(products, 'qwe123')

    expect(updateProductsSpy).toHaveBeenCalled()
    expect(result.success).toBe(true)
  })
})