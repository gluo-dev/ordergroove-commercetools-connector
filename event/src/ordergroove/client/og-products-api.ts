import { logger } from '../../utils/logger.utils';
import { OrdergrooveProduct, OrdergrooveApiResponse } from "../../types/custom.types";
import { readConfiguration } from '../../utils/config.utils'

const headers = {
  'x-api-key': readConfiguration().ordergrooveApiKey,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const retrieveOgProduct = async (product_id: string, executionId: string): Promise<OrdergrooveApiResponse> => {
  let result: OrdergrooveApiResponse = {
    success: false,
    status: 0
  };

  logger.info(`[${executionId}] Starting the process of retrieving the product ${product_id} from ordergroove.`);

  try {
    await fetch(`${readConfiguration().ordergrooveApiUrl}/products/${product_id}/`, {
      method: 'GET',
      headers
    })
      .then((response) => {
        result.status = response.status;

        if (response.ok) {
          result.success = true;
          return response.json();
        }

        throw new Error(`Status ${response.status}`);
      })
      .then((data) => {
        const ogProduct: OrdergrooveProduct = {
          product_id: data.external_product_id,
          sku: data.sku,
          name: data.name,
          price: parseFloat(data.price),
          live: data.live,
          image_url: data.image_url,
          detail_url: data.detail_url
        };
        result.product = ogProduct
      })
      .catch((error) => {
        logger.error(`[${executionId}] Error ocurred during the process of retrieving the product ${product_id} from ordergroove.`, error);
      });
  } catch (error) {
    logger.error(`[${executionId}] Error ocurred during the process of retrieving the product ${product_id} from ordergroove.`, error);
  }

  return result;
}

export const createProducts = async (products: Array<OrdergrooveProduct>, executionId: string): Promise<OrdergrooveApiResponse> => {
  let result: OrdergrooveApiResponse = {
    success: false,
    status: 0
  };

  logger.info(`[${executionId}] Starting the process of creating products in ordergroove: ${JSON.stringify(products)}`);

  try {
    await fetch(`${readConfiguration().ordergrooveApiUrl}/products-batch/create/?force_all_fields=false`, {
      method: 'POST',
      body: JSON.stringify(products),
      headers
    })
      .then((response) => {
        result.status = response.status;

        if (response.ok) {
          result.success = true;
          return response.json();
        }

        throw new Error(`Status ${response.status}`);
      })
      .then((data) => {
        logger.info(`[${executionId}] Response during the process of creating products in ordergroove: ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        logger.error(`[${executionId}] Error ocurred during the process of creating products in ordergroove.`, error);
      });
  } catch (error) {
    logger.error(`[${executionId}] Error ocurred during the process of creating products in ordergroove.`, error);
  }

  return result;
}

export const updateProducts = async (products: Array<OrdergrooveProduct>, executionId: string): Promise<OrdergrooveApiResponse> => {
  let result: OrdergrooveApiResponse = {
    success: false,
    status: 0
  };

  logger.info(`[${executionId}] Starting the process of updating products in ordergroove: ${JSON.stringify(products)}`);

  try {
    await fetch(`${readConfiguration().ordergrooveApiUrl}/products-batch/update/?force_all_fields=false`, {
      method: 'PATCH',
      body: JSON.stringify(products),
      headers
    })
      .then((response) => {
        result.status = response.status;

        if (response.ok) {
          result.success = true;
          return response.json();
        }

        logger.info('updateProducts response:', response);
        throw new Error(`Status ${response.status}`);
      })
      .then((data) => {
        logger.info(`[${executionId}] Response during the process of updating products in ordergroove: ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        logger.error(`[${executionId}] Error ocurred during the process of updating products in ordergroove.`, error);
      });
  } catch (error) {
    logger.error(`[${executionId}] Error ocurred during the process of updating products in ordergroove.`, error);
  }

  return result;
}