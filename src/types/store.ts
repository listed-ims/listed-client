import { StoreStatus } from "@listed-constants";

export interface StoreResponse {
  id: number;
  name: string;
  status: StoreStatus;
  totalPriceValue: number;
  totalProducts: number;
  totalLowStock: number;
  totalNearExpiry: number;
  totalRevenue: number;
  totalItemsSold: number;
}

export interface StoreRequest {
  name?: string;
  status: StoreStatus;
}

export interface CloseStoreRequest {
  id?: number;
  storeRequest: StoreRequest;
}
