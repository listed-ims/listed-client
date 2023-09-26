import {
  deleteProductService,
  updateProductService,
  addProductService,
} from "@listed-services";
import { ProductRequest, AddProductRequest, UpdateRequest } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useUpdateProductMutation = (
  mutationOptions: MutationOptions<any, AxiosError, UpdateRequest>
) => {
  return useMutation(updateProductService, mutationOptions);
};

// export const useUpdateProductMutation =(
//   mutationOptions: MutationOptions < any, AxiosError,ProductRequest>
// ) => {
//   return useMutation(updateProductService,mutationOptions);
// };

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
