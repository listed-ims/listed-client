import { ProductResponse } from "./product";
import { UserResponse } from "./user";

export interface IncomingRequest {
  initialQuantity: number;
  purchasePrice: number;
  expirationDate?: Date;
  comment?: string;
}

export interface IncomingResponse {
  id: number;
  initialQuantity: number;
  purchasePrice: number;
  expirationDate?: Date;
  comment?: string;
  transactionDate: Date;
  referenceNumber: string;
  product: ProductResponse;
  user: UserResponse;
}
