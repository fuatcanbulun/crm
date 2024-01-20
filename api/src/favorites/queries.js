const getFavoriteByVideoId = "SELECT * FROM favorites WHERE video_id = $1";
const getFavoritesByUserId = "SELECT * FROM favorites WHERE user_id = $1";
const addFavorite =
  "INSERT INTO favorites (id, user_id, video_id) VALUES ($1, $2, $3)";
const removeFavorite = "DELETE FROM favorites WHERE video_id = $1";

export default {
  getFavoriteByVideoId,
  getFavoritesByUserId,
  addFavorite,
  removeFavorite,
};
