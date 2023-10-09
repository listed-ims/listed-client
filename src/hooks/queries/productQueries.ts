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
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
  return useQuery(
    [GET_PRODUCT, productId],
    () => getProductService(productId),
    {
      staleTime: fiveMinutes,
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
