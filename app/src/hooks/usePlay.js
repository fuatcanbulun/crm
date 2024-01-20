import { useNavigate } from "react-router-dom";
import { useStore } from "../contexts/StoreContext";

const usePlay = () => {
  const navigate = useNavigate();
  const store = useStore();

  function playVideo(val) {
    const lastPlayed = [...store.lastPlayed];
    lastPlayed.push(val);
    store.setLastPlayed(lastPlayed);
    navigate("/detail", { state: val });
  }

  return { playVideo };
};

export default usePlay;
