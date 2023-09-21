import { ProductFilter } from "@listed-constants";
import { axiosInstance } from "./axios";
import { ProductResponse } from "@listed-types";

export const getProductsService = async (
  storeId: number,
  barcode?: string,
  keyword?: string,
  filter?: ProductFilter,
  sort?: string,
  pageNumber?: number,
  pageSize?: number,
) => {
  try {
    const response = await axiosInstance.get("products", {
      params: {
        storeId: storeId,
        barcode: barcode,
        keyword: keyword,
        filter: filter,
        sort: sort,
        pageNumber: pageNumber,
        pageSize,
      }
    });
    return response.data as ProductResponse[];
  } catch (error) {
    throw error;
  }
};
