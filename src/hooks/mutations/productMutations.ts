import {
  deleteProductService,
  updateProductService,
  addProductService,
} from "@listed-services";
import {
  AddProductRequest,
  UpdateRequest,
  ProductResponse,
} from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateProductMutation = (
  mutationOptions: MutationOptions<ProductResponse, AxiosError, UpdateRequest>
) => {
  return useMutation(updateProductService, mutationOptions);
};

export const useDeleteProductMutation = (
  mutationOptions: MutationOptions<any, AxiosError, number>
) => {
  return useMutation(deleteProductService, mutationOptions);
};

export const useAddProductMutation = (
  mutationOptions: MutationOptions<any, AxiosError, AddProductRequest>
) => {
  return useMutation(addProductService, mutationOptions);
};
