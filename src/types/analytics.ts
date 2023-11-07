import { OutgoingCategory } from "@listed-constants";
import { ProductResponse } from "./product";

export interface SummaryResponse {
  totalLowStock: number;
  totalNearExpiry: number;
  totalDailyRevenue: number;
  totalDailyItemsSold: number;
}

export interface RevenueResponse {
  startDate: Date;
  endDate: Date;
  revenue: number;
  totalPages: number;
}

export interface ProductSalesResponse {
  product: ProductResponse;
  totalSales: number;
  totalUnitSold: number;
}
export interface TopProductResponse {
  startDate: Date;
  endDate: Date;
  products: ProductSalesResponse[];
  totalPages: number;
}

export interface CategoryValueResponse {
  category: OutgoingCategory;
  value: number;
}
export interface OutgoingValueResponse {
  startDate: Date;
  endDate: Date;
  categories: CategoryValueResponse[];
  totalPages: number;
}
