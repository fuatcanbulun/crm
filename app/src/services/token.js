import { Get } from "./requests";

export const checkToken = async () => {
  let result;
  await Get(
    "token",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};
