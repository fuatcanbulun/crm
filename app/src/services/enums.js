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
      console.log("getEnumAppointmentTypes", response);
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumAppointmentStatusTypes = async () => {
  let result;
  await Get(
    "enums/appointment-status-types",
    (response) => {
      console.log("enums/appointment-status-types", response);
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

export const getEnumAccountingTypes = async () => {
  let result;
  await Get(
    "enums/accounting-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumCurrencyTypes = async () => {
  let result;
  await Get(
    "enums/currency-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumIncomeTypes = async () => {
  let result;
  await Get(
    "enums/income-types",
    (response) => {
      console.log("getEnumIncomeTypes", response);
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumExpenseTypes = async () => {
  let result;
  await Get(
    "enums/expense-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getEnumPaymentTypes = async () => {
  let result;
  await Get(
    "enums/payment-types",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};
