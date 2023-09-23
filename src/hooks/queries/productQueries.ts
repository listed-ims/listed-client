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

export const useValidateBarcode = (storeId: number, barcode: string) => {
  return useQuery(
    [VALIDATE_BARCODE, { storeId, barcode }],
    () => validateBarcodeService(storeId, barcode),
    {
      enabled: !!barcode,
    }
  );
};

export const useGetProductDetails = (productId: number) => {
  return useQuery([GET_PRODUCT, productId], () => getProductService(productId));
};
