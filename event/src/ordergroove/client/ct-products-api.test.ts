import { jest } from '@jest/globals'

import { getProductProjections } from './ct-products-api'
import { QueryArgs } from '../../types/index.types'
import { mockProductProjectionPagedQueryResponse } from '../mocks/mocks'
import * as CreateClient from '../../client/create.client'
import * as BuildClient from '../../client/build.client'


const mockedExecute = jest.fn().mockReturnValue({ body: mockProductProjectionPagedQueryResponse })
const mockedPost = jest.fn().mockReturnValue({
  execute: jest.fn()
})

jest.mock('../../utils/config.utils', () => {
  return {
    readConfiguration: jest.fn().mockReturnValue({
      clientId: 'ajgu65tLj57rIQOkgG5x1j68',
      clientSecret: 'ggtgtghAhyhyhSlmzS0fjdu879goh645',
      projectKey: 'project-data',
      scope: 'manage_project:project-data',
      region: 'europe-west1.gcp',
      languageCode: 'en-US',
      currencyCode: 'USD',
      ordergrooveApiKey: '1234567890qwertyuiop'
    }),
  }
})

jest.mock('../../middleware/auth.middleware', () => {
  return {
    authMiddlewareOptions: jest.fn()
  }
})
jest.mock('../../client/build.client', () => {
  return {
    createClient: jest.fn()
  }
})
jest.mock('../../client/create.client', () => {
  return {
    createApiRoot: jest.fn().mockImplementation(() => ({
      productProjections: jest.fn().mockReturnValue({
        get: jest.fn().mockReturnValue({
          execute: mockedExecute
        }),
        post: mockedPost
      })
    }))
  }
})

describe('getProductProjections', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should call the Commercetools API with the correct parameters', async () => {
    const createApiRootSpy = jest.spyOn(CreateClient, 'createApiRoot')
    const createClientSpy = jest.spyOn(BuildClient, 'createClient')

    const queryArgs = { limit: 100 } as unknown as QueryArgs

    await getProductProjections(queryArgs)

    expect(mockedExecute).toHaveBeenCalledTimes(1)
    expect(mockedExecute).toHaveReturned()
    expect(mockedExecute).toHaveReturnedWith({ "body": mockProductProjectionPagedQueryResponse })
  })
})