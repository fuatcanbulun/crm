import { Get } from "./requests";

export const getCategories = async () => {
  let result;
  await Get(
    "categories",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};
