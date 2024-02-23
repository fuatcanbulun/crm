import { Get, Post, Put, Delete } from "./requests";

export const getMovements = async () => {
  let result;
  await Get(
    "movements",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const addMovement = async (values, onSuccess) => {
  console.log("addMovementValues", values);

  const postBody = values;
  let result;
  await Post(
    "movements",
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

export const updateMovement = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Put(
    "movements",
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

export const removeMovementById = async (movementId, onSuccess) => {
  let result;
  await Delete(
    `movements/${movementId}`,
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
