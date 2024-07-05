import { Get, Post, Put, Delete } from "./requests";

export const getAppointments = async () => {
  let result;

  console.log("getAppointments0");

  await Get(
    "appointments",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getAppointmentsByPersonId = async (personId) => {
  let result;
  await Get(
    `appointments/person/${personId}`,
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const addAppointment = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Post(
    "appointments",
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

export const updateAppointment = async (values, onSuccess) => {
  const postBody = values;
  let result;
  await Put(
    "appointments",
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

export const removeAppointmentById = async (appointmentId, onSuccess) => {
  let result;
  await Delete(
    `appointments/${appointmentId}`,
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
