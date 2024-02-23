import { Get, Post, Put, Delete } from "./requests";

export const getProducts = async () => {
  let result;
  await Get(
    "products",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const addProduct = async (values, onSuccess) => {
  console.log("addProductValues", values);

  const postBody = values;
  let result;
  await Post(
    "products",
    postBody,
    (response) => {
      onSuccess();
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const updateProduct = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Put(
    "products",
    postBody,
    (response) => {
      onSuccess();
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const removeProductById = async (productId, onSuccess) => {
  let result;
  await Delete(
    `products/${productId}`,
    (response) => {
      onSuccess();
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};
