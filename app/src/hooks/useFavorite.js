import { useStore } from "../contexts/StoreContext";
import { Post } from "../services/requests";

const useFavorite = () => {
  const store = useStore();

  function toggleFavorite(val) {
    console.log("val", val);

    // Post(
    //   "users/signup",
    //   values,
    //   (response) => {
    //     console.log(response);
    //     setIsNewUser(false);
    //   },
    //   (error) => console.log(error)
    // );

    // const favorites = [...store.favorites];

    // if (favorites.includes(val)) {
    //   store.setFavorites(favorites.filter((item) => item !== val));
    // } else {
    //   favorites.push(val);
    //   store.setFavorites(favorites);
    // }
  }

  return { toggleFavorite };
};

export default useFavorite;
