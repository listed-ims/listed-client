import {
  GET_PRODUCT,
  GET_PRODUCTS,
  ProductFilter,
  VALIDATE_BARCODE,
} from "@listed-constants";
import {
  getProductService,
  getProductsService,
  validateBarcodeService,
} from "@listed-services";
import { ProductResponse } from "@listed-types";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetProductList = (
  storeId: number,
  barcode?: string,
  keyword?: string,
  filter?: ProductFilter,
  sort?: string,
  pageSize?: number
) => {
  return useInfiniteQuery(
    [GET_PRODUCTS, { storeId, barcode, keyword, filter, sort, pageSize }],
    ({ pageParam = 1 }) =>
      getProductsService(
        storeId,
        barcode,
        keyword,
        filter,
        sort,
        pageParam,
        pageSize
      ),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.length < pageSize! ? undefined : pages.length + 1,
    }
  );
};

export const useValidateBarcode = (storeId: number, barcode: string) => {
  return useQuery(
    [VALIDATE_BARCODE, { storeId, barcode }],
    () => validateBarcodeService(storeId, barcode),
    {
      enabled: !!barcode,
    }
  );
};

const fiveMinutes = 1000 * 60 * 5;

export const useGetProductDetails = (productId: number) => {
  return useQuery<ProductResponse, AxiosError<{ message: string }>>(
    [GET_PRODUCT, productId],
    () => getProductService(productId),
    {
      staleTime: fiveMinutes,
      enabled: !!productId,
    }
  );
};

export const useGetProductWithBarcode = (storeId: number, barcode: string) => {
  return useQuery<ProductResponse, AxiosError>(
    [GET_PRODUCT, { storeId, barcode }],
    () =>
      getProductsService(storeId, barcode).then(
        (products) => products[0] || null
      ),
    {
      enabled: !!barcode,
    }
  );
};
