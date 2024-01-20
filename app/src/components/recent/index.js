import React, { useEffect, useState } from "react";
import { RecentContainer } from "./style";
import Text from "../text";
import RecentItem from "../recentItem";
import { useStore } from "../../contexts/StoreContext";
import { Get } from "../../services/requests";

const Recent = () => {
  const store = useStore();
  const [videos, setVideos] = useState([]);
  const [recentData, setRecentData] = useState([]);

  useEffect(() => {
    getAllMedia();
  }, []);

  const getAllMedia = async () => {
    Get(
      "videos",
      (response) => setVideos(response),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    if (videos.length > 0) {
      const newRecentData = [];
      store.lastPlayed.forEach((element) => {
        const song = videos.find((item) => item.id === element);
        newRecentData.push(song);
      });

      console.log("newRecentData", newRecentData);
      setRecentData(newRecentData);
    }
  }, [store.lastPlayed, videos]);

  return (
    <RecentContainer>
      <Text label="Last Played" color="textPrimary" size="sm" />

      {recentData
        .slice(0)
        .reverse()
        .map((item, index) => (
          <RecentItem
            key={index}
            id={item.id}
            title={item.title}
            image={item.image}
          />
        ))}
    </RecentContainer>
  );
};

export default Recent;
