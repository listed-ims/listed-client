import { GET_PRODUCT, GET_PRODUCTS, ProductFilter } from "@listed-constants";
import { getProductService, getProductsService } from "@listed-services";
import { useQuery } from "@tanstack/react-query";

export const useGetProductList = (
  storeId: number,
  barcode?: string,
  keyword?: string,
  filter?: ProductFilter,
  sort?: string,
  pageNumber?: number,
  pageSize?: number
) => {
  return useQuery(
    [
      GET_PRODUCTS,
      { storeId, barcode, keyword, filter, sort, pageNumber, pageSize },
    ],
    () =>
      getProductsService(
        storeId,
        barcode,
        keyword,
        filter,
        sort,
        pageNumber,
        pageSize
      )
  );
};

export const useGetProductDetails = ( productId:number) => {
    return useQuery([GET_PRODUCT,productId], () => getProductService(productId));
 };