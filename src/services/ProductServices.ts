import axios from "axios";
import { API_BASE_URL } from "../utils/constants/Api";
import { Product } from "../types/Product";
const productsUrl = `${API_BASE_URL}products`;

const addProductService = (product: Product, token: string) => {
  return axios.post(`${productsUrl}`, product, {
    headers: {
      Authorization: token,
    },
  });
};

const validateBarcodeService = (token: string, barcode: string) => {
  return axios.post(`${productsUrl}/barcode-validation`, undefined, {
    params: {
      barcode: barcode,
    },
    headers: {
      Authorization: token,
    },
  });
};

const getProductsService = (
  token: string,
  pageNumber?: number,
  pageSize?: number,
  barcode?: string,
  keyword?: string,
  sort?: string
) => {
  return axios.get(`${productsUrl}`, {
    params: {
      pageNumber: pageNumber,
      pageSize: pageSize,
      barocde: barcode,
      keyword: keyword,
      sort: sort,
    },
    headers: {
      Authorization: token,
    },
  });
};

const getProductService = (token: string, productId: number) => {
  return axios.get(`${productsUrl}/${productId}`, {
    headers: {
      Authorization: token,
    },
  });
};

const getProductQuantityService = (token: string, productId: number) => {
  return axios.get(`${productsUrl}/${productId}/quantity`, {
    headers: {
      Authorization: token,
    },
  });
};

const updateProductService = (
  token: string,
  productId: number,
  newProductDetails: Product
) => {
  return axios.put(`${productsUrl}/${productId}`, newProductDetails, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteProductService = (token: string, productId: number) => {
  return axios.delete(`${productsUrl}/${productId}`, {
    headers: {
      Authorization: token,
    },
  });
};

export {
  addProductService,
  validateBarcodeService,
  getProductsService,
  getProductService,
  getProductQuantityService,
  updateProductService,
  deleteProductService,
};
