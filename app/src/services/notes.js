import { Get, Post, Put, Delete } from "./requests";

export const getNotes = async () => {
  let result;
  await Get(
    "notes",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

// export const getAppointmentsByPersonId = async (personId) => {
//   let result;
//   await Get(
//     `appointments/person/${personId}`,
//     (response) => {
//       result = response;
//     },
//     (error) => {
//       result = error;
//     }
//   );
//   return result;
// };

export const addNote = async (values, onSuccess) => {
  console.log("addNote", values);

  const postBody = values;
  let result;
  await Post(
    "notes",
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

export const getNotesByPersonId = async (personId) => {
  let result;
  await Get(
    `notes/person/${personId}`,
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

// export const updateAppointment = async (values, onSuccess) => {
//   const postBody = values;
//   let result;
//   await Put(
//     "appointments",
//     postBody,
//     (response) => {
//       onSuccess();
//       result = response;
//     },
//     (error) => {
//       result = error;
//     }
//   );
//   return result;
// };

// export const removeAppointmentById = async (appointmentId, onSuccess) => {
//   let result;
//   await Delete(
//     `appointments/${appointmentId}`,
//     (response) => {
//       onSuccess();
//       result = response;
//     },
//     (error) => {
//       result = error;
//     }
//   );
//   return result;
// };
