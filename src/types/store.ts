import { UserResponse } from "./user";

export interface StoreResponse {
  id: number;
  name: string;
  owner: UserResponse;
  inventoryValue: number;
}

export interface StoreRequest {
  name?: string;
}