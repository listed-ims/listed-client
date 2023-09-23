import { ProductUnit } from "@listed-constants";

export interface ProductResponse {
  id: number,
  name: string;
  barcode?: string;
  variant?: string;
  salePrice: number;
  threshold?: number;
  unit: ProductUnit;
  quantity: number
  totalIn: number;
  totalOut: number;
};

export interface ProductRequest{
  name: string;
  barcode?: string;
  variant?: string;
  salePrice: number;
  threshold?: number;
  unit: ProductUnit;
}