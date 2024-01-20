import { Get, Post } from "./requests";

export const getVideos = async () => {
  let result;
  await Get(
    "videos",
    (response) => {
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};

export const getVideo = async (video_id) => {
  let result;
  await Get(
    `videos/${video_id}`,
    (response) => {
      console.log("fuatcan5", response);
      result = response;
    },
    (error) => {
      result = error;
    }
  );
  return result;
};
