import { CreatedBy, MessageDeliveryPayload, Order, ProductProjection, InventoryEntry, ChannelReference } from '@commercetools/platform-sdk';

export interface CtEventPayload extends MessageDeliveryPayload {
  notificationType: 'Message';
  projectKey: string;
  id: string;
  version: number;
  sequenceNumber: number;
  resource: {
    typeId: 'product' | 'order' | 'inventory-entry';
    id: string;
  };
  resourceUserProvidedIdentifiers?: {
    key?: string;
    sku?: string;
  }
  resourceVersion: number;
  type: 'ProductPublished' | 'OrderCreated' | 'InventoryEntryQuantitySet' | 'InventoryEntryDeleted' | 'InventoryEntryCreated';
  sku?: string;
  order?: Order;
  productProjection?: ProductProjection;
  inventoryEntry?: InventoryEntry;
  createdAt: string;
  lastModifiedAt: string;
  createdBy: CreatedBy;
  lastModifiedBy: CreatedBy;
  supplyChannel?: ChannelReference;
}

export interface OrdergrooveProduct {
  product_id: string;
  sku: string;
  name: string;
  price: number;
  live: boolean;
  image_url: string;
  detail_url: string;
}

export interface StandardProductAttributes {
  name: string;
}

export interface OrdergrooveApiResponse {
  success: boolean;
  status: number;
  product?: OrdergrooveProduct;
}