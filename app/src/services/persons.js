import { Get, Post, Put, Delete } from "./requests";

export const getPersons = async () => {
  let result;
  await Get(
    "persons",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getPersonById = async (personId) => {
  let result;
  await Get(
    `persons/${personId}`,
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const addPerson = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Post(
    "persons",
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

export const updatePerson = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Put(
    "persons",
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

export const removePersonById = async (personId, onSuccess) => {
  let result;
  await Delete(
    `persons/${personId}`,
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
