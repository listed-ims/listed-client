import { StoreStatus } from "@listed-constants";
import { UserResponse } from "./user";

export interface StoreResponse {
  id: number;
  name: string;
  owner: UserResponse;
  status: StoreStatus;
  totalProducts: number;
  totalPriceValue: number;
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
