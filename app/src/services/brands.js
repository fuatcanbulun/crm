import { Get, Post, Put, Delete } from "./requests";

export const getBrands = async () => {
  let result;
  await Get(
    "brands",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const addBrand = async (values, onSuccess) => {
  console.log("addBrandValues", values);

  const postBody = values;
  let result;
  await Post(
    "brands",
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

export const updateBrand = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Put(
    "brands",
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

export const removeBrandById = async (brandId, onSuccess) => {
  let result;
  await Delete(
    `brands/${brandId}`,
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
