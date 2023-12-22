import { logger } from '../utils/logger.utils';
import { CtEventPayload, OrdergrooveProduct, OrdergrooveApiResponse } from '../types/custom.types';
import { extractProductVariants } from './helpers/product-helper';
import { retrieveOgProduct, createProducts, updateProducts } from './client/og-products-api';
import { createUUID } from './utils/data-utils';

export const processProductPublishedEvent = async (payload : CtEventPayload) : Promise<boolean> => {
  try {
    const ctProducts: OrdergrooveProduct[] = await extractProductVariants(payload);

    for (let i = 0; i < ctProducts.length; i++) {
      const ctProduct: OrdergrooveProduct = ctProducts[i];
      const execution_id = createUUID();
      const ogRetrieveResponse: OrdergrooveApiResponse = await retrieveOgProduct(ctProduct.product_id, execution_id);

      if (ogRetrieveResponse.product === undefined) {
        const newProducts = new Array();
        newProducts.push(ctProduct);
        const ogCreateResponse = await createProducts(newProducts, execution_id);

        // Retry one more time
        if (!ogCreateResponse.success && (ogCreateResponse.status === 500)) {
          await createProducts(newProducts, execution_id);
        }
      } else {
        if (JSON.stringify(ctProduct) !== JSON.stringify(ogRetrieveResponse.product)) {
          const updProducts = new Array();
          updProducts.push(ctProduct);
          const ogUpdateResponse = await updateProducts(updProducts, execution_id);

          // Retry one more time
          if (!ogUpdateResponse.success && (ogUpdateResponse.status === 500)) {
            await updateProducts(updProducts, execution_id);
          }
        } else {
          logger.info(`[${execution_id}] The product published with sku ${ctProduct.sku} does not need an update in ordergroove.`);
        }
      }
    }
  } catch (error) {
    logger.error('Error processing the event received (ProductPublished).', error);
  }

  return true;
}