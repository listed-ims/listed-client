import axios from "axios";
import { BASE_URL } from "../utils/Api";
import { Product } from "../types/Product";
const productsUrl = `${BASE_URL}products`;

class ProductServices {
  addProduct(product: Product, token: string) {
    return axios.post(`${productsUrl}`, product, {
      headers: {
        Authorization: token,
      },
    });
  }

  validateBarcode(token: string, barcode: string) {
    return axios.post(`${productsUrl}/barcode-validation`, undefined, {
      params: {
        barcode: barcode,
      },
      headers: {
        Authorization: token,
      },
    });
  }

  getProducts(
    token: string,
    pageNumber?: number,
    pageSize?: number,
    barcode?: string,
    keyword?: string
  ) {
    return axios.get(`${productsUrl}`, {
      params: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        barocde: barcode,
        keyword: keyword,
      },
      headers: {
        Authorization: token,
      },
    });
  }

  getProduct(token: string, productId: number) {
    return axios.get(`${productsUrl}/${productId}`, {
      headers: {
        Authorization: token,
      },
    });
  }

  getProductQuantity(token: string, productId: number) {
    return axios.get(`${productsUrl}/${productId}/quantity`, {
      headers: {
        Authorization: token,
      },
    });
  }

  updateProduct(token: string, productId: number, newProductDetails: Product) {
    return axios.put(`${productsUrl}/${productId}`, newProductDetails, {
      headers: {
        Authorization: token,
      },
    });
  }

  deleteProduct(token: string, productId: number) {
    return axios.delete(`${productsUrl}/${productId}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new ProductServices();
