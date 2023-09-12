import { StoreStatus } from "@listed-constants";

export interface StoreResponse {
  id: number;
  name: string;
  status: StoreStatus;
}
