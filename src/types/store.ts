import { StoreStatus } from "@listed-constants";

export interface StoreResponse {
  id: number;
  name: string;
  status: StoreStatus;
}

export interface StoreListRequest {
  status: StoreStatus;
  pageNumber?: number;
  pageSize?: number;
}