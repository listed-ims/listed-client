import { OutgoingCategory } from "@listed-constants";
import { ProductResponse } from "./product";
import { UserResponse } from "./user";

export interface OutProductRequest {
  product: ProductResponse;
  quantity: number;
  }

export interface OutgoingRequest {
  products: OutProductRequest[];
  category: OutgoingCategory;
  comment?: string;
}

export interface OutProductResponse {
  id: number;
  product: ProductResponse;
  quantity: number;
  price: number;
}

export interface OutgoingResponse {
    id: number;
    user: UserResponse;
    products: OutProductResponse[];
    category: OutgoingCategory;
    price: number;
    comment: string;
    transactionDate: Date;
    referenceNumber: string;
}
