import { Get, Post, Put, Delete } from "./requests";

export const getAccountings = async () => {
  let result;
  await Get(
    "accountings",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getAccountingsByPersonId = async (personId) => {
  let result;
  await Get(
    `accountings/person/${personId}`,
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getAccountingsByDate = async (startDate, endDate) => {
  let result;
  await Get(
    `accountings/date?startDate=${startDate}&endDate=${endDate}`,
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const addAccounting = async (values, onSuccess) => {
  console.log("addAccountingvalues", values);

  const postBody = values;
  let result;
  await Post(
    "accountings",
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

export const updateAccounting = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Put(
    "accountings",
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

export const removeAccountingById = async (accountingId, onSuccess) => {
  let result;
  await Delete(
    `accountings/${accountingId}`,
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
