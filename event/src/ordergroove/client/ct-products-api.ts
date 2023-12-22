import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { createApiRoot } from '../../client/create.client';
import { GetFunction } from '../../types/index.types';

export const getProductProjections: GetFunction<ProductProjectionPagedQueryResponse> = async (queryArgs) => {
  const { body } = await createApiRoot().productProjections().get({ queryArgs }).execute();

  return body;
};