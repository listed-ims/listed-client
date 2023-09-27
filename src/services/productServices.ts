import { ProductFilter } from "@listed-constants";
import { axiosInstance } from "./axios";
import {
  AddProductRequest,
  ProductResponse, UpdateRequest,
} from "@listed-types";

export const getProductsService = async (
  storeId: number,
  barcode?: string,
  keyword?: string,
  filter?: ProductFilter,
  sort?: string,
  pageNumber?: number,
  pageSize?: number
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
      },
    });
    return response.data as ProductResponse[];
  } catch (error) {
    throw error;
  }
};

export const validateBarcodeService = async (
  storeId: number,
  barcode: string
) => {
  try {
    console.log("Validating");
    const response = await axiosInstance.get("products/validation/barcode", {
      params: {
        storeId: storeId,
        barcode: barcode,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProductService = async (productRequest: AddProductRequest) => {
  try {
    const response = await axiosInstance.post(
      "products",
      productRequest.productRequest,
      {
        params: {
          storeId: productRequest.storeId,
        },
      }
    );
    return response.data as ProductResponse;
  } catch (error) {
    throw error;
  }
};

export const getProductService = async (productId: number) => {
  try {
    const response = await axiosInstance.get(`products/${productId}`);
    return response.data as ProductResponse;
  } catch (error) {
    throw error;
  }
};

export const updateProductService = async (productRequest: UpdateRequest) => {
  try {
    const response = await axiosInstance.put(`products/${productRequest.productId}`,productRequest.productRequest)
    return response.data as ProductResponse;
  }catch(error){
    throw error;
  }
};


export const deleteProductService = async (productId: number) =>{
  try {
    const response = await axiosInstance.delete(`products/${productId}`);
    return response.data as ProductResponse;
  } catch (error) {
    throw error;
  }
};
