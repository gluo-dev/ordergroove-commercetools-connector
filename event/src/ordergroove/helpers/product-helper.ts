import { ProductVariant, Price, Image, ProductVariantAvailability } from '@commercetools/platform-sdk';

import { logger } from '../../utils/logger.utils';
import { CtEventPayload, OrdergrooveProduct } from '../../types/custom.types';
import { addDecimalPointToCentAmount } from '../utils/data-utils';

// TODO get this data from config.utils (gives error in tests)
const LANGUAGE_CODE = process.env.CTP_LANGUAGE_CODE as string;
const CURRENCY_CODE = process.env.CTP_CURRENCY_CODE as string;

export const extractProductVariants = async (payload: CtEventPayload): Promise<OrdergrooveProduct[]> => {
  let result = new Array<OrdergrooveProduct>;

  try {
    const productName = payload.productProjection?.name[LANGUAGE_CODE] === undefined ?
        '' : payload.productProjection?.name[LANGUAGE_CODE];

    const masterVariantSku = payload.productProjection?.masterVariant.sku === undefined ?
        '' : payload.productProjection?.masterVariant.sku;

    const masterVariantPrice = await getPrice(masterVariantSku, payload.productProjection?.masterVariant.prices);

    if (masterVariantPrice === undefined) {
      logger.info(getInvalidPriceMessage(masterVariantSku));
    } else {
      let ogProduct: OrdergrooveProduct = {
        product_id: masterVariantSku,
        sku: masterVariantSku,
        name: productName,
        price: masterVariantPrice,
        live: isProductOnStock(payload.productProjection?.masterVariant.availability),
        image_url: getImageUrl(payload.productProjection?.masterVariant.images),
        detail_url: ''
      };
      result.push(ogProduct);
    }

    const variants: ProductVariant[] = payload.productProjection?.variants === undefined ? new Array() : payload.productProjection?.variants;
    for (let x = 0; x < variants.length; x++) {
      const variant = variants[x];
      const variantSku = variant.sku === undefined ? '' : variant.sku;

      let variantImage = getImageUrl(variant.images);
      if (variantImage === '') {
        variantImage = getImageUrl(payload.productProjection?.masterVariant.images);
      }

      const variantPrice = await getPrice(variantSku, variant.prices);

      if (variantPrice === undefined) {
        logger.info(getInvalidPriceMessage(variantSku));
      } else {
        let ogProduct: OrdergrooveProduct = {
          product_id: variantSku,
          sku: variantSku,
          name: productName,
          price: variantPrice,
          live: isProductOnStock(variant.availability),
          image_url: variantImage,
          detail_url: ''
        };
        result.push(ogProduct);
      }
    }
  } catch (error) {
    logger.error('Error extracting product variants of ProductPublished event message.', error);
  }

  logger.info('-->> Product variants extracted:', result);
  return result;
}

async function getPrice(sku: string, productPrices?: Price[]): Promise<number | undefined> {
  let result = undefined;

  let embeddedPrice = undefined;
  if (productPrices !== undefined) {
    productPrices.forEach(price => {
      if (price.value.currencyCode === CURRENCY_CODE) {
        result = addDecimalPointToCentAmount(price.value.centAmount, price.value.fractionDigits);
        return;
      }
    });
  }

  return result;
}

function getInvalidPriceMessage(sku: string) {
  return `The product with SKU ${sku} does not have an embedded price configured for the given settings; therefore, it will not be created in ordergroove.`
}

export const isProductOnStock = (productAvailability?: ProductVariantAvailability): boolean => {
  let result = false;

  if (productAvailability === undefined) {
    result = true;
  } else {
    const channels = productAvailability.channels;

    let atLeastOneChannelHasStock = false;
    if (channels !== undefined) {
      let valuesArray = Object.values(channels);

      valuesArray.forEach(value => {
        if (value.isOnStock === true) {
          atLeastOneChannelHasStock = true;
          return;
        }
      });
    }

    const masterVariantIsOnStockForAnyChannel = productAvailability.isOnStock;

    if (masterVariantIsOnStockForAnyChannel !== undefined) {
      result = masterVariantIsOnStockForAnyChannel || atLeastOneChannelHasStock;
    } else {
      result = atLeastOneChannelHasStock;
    }
  }

  return result;
}

function getImageUrl(productImages?: Image[]) {
  let result = '';

  if (productImages !== undefined) {
    if (productImages.length > 0) {
      result = productImages[0].url;
    }
  }

  return result;
}