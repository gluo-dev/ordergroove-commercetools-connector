import { ProductVariant, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';

import { getProductProjections } from '../client/ct-products-api';

export const getProductVariantBySku = async (sku: string): Promise<ProductVariant> => {
  try {
    let productVariant: ProductVariant | undefined;

    const productProjection: ProductProjectionPagedQueryResponse =
      await getProductProjections({ where: `masterVariant(sku=\"${sku}\") or variants(sku=\"${sku}\")` });

    for (let result of productProjection.results) {
      let masterVariantSku = result.masterVariant.sku === undefined ? '' : result.masterVariant.sku;
      if (sku === masterVariantSku) {
        productVariant = result.masterVariant;
        break;
      } else {
        for (let variant of result.variants) {
          let variantSku = variant.sku === undefined ? '' : variant.sku;
          if (sku === variantSku) {
            productVariant = variant;
            break;
          }
        }
      }
    }

    if (productVariant === undefined) {
      throw new Error(`Product variant undefined.`);
    }

    return productVariant;
  } catch (error: any) {
    throw new Error(`Error during the process of getting the product with sku ${sku} from commercetools: ${error.message}`);
  }
}