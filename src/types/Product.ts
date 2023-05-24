export interface Product {
  id: number,
  name: string;
  barcode?: string;
  variant?: string;
  salePrice: number;
  threshold?: number;
  unit: string;
};
