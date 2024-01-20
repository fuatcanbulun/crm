import { Get, Post } from "./requests";
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem("access_token");
let decoded = "";

if (token) {
  decoded = jwtDecode(token);
}

export const addFavorite = async (video_id) => {
  const postBody = { user_id: decoded.id, video_id };
  let result;
  await Post(
    "favorites",
    postBody,
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getFavorites = async () => {
  let result;
  await Get(
    `favorites/${decoded.id}`,
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};
