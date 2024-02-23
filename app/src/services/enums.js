import { Get } from "./requests";

export const getEnumPersonTypes = async () => {
  let result;
  await Get(
    "enums/person-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumGenderTypes = async () => {
  let result;
  await Get(
    "enums/gender-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumCities = async () => {
  let result;
  await Get(
    "enums/cities",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumAppointmentTypes = async () => {
  let result;
  await Get(
    "enums/appointment-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumProductTypes = async () => {
  let result;
  await Get(
    "enums/product-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumStockMovementTypes = async () => {
  let result;
  await Get(
    "enums/stock-movement-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};
