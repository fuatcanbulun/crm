import { Get, Post, Put, Delete } from "./requests";

export const getStocks = async () => {
  let result;
  await Get(
    "stocks",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const addStock = async (values, onSuccess) => {
  console.log("addStockValues", values);

  const postBody = values;
  let result;
  await Post(
    "stocks",
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

export const updateStock = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Put(
    "stocks",
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

export const removeStockById = async (stockId, onSuccess) => {
  let result;
  await Delete(
    `stocks/${stockId}`,
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
