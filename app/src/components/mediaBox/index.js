import React from "react";
import {
  MediaBoxContainer,
  MediaBoxImage,
  MediaBoxTitle,
  MediaBoxSubTitle,
  MediaBoxFooter,
} from "./style";
import Text from "../text";
import Image from "../image";
import DynamicImage from "../dynamicImage";
import Button from "../button";
import usePlay from "../../hooks/usePlay";
import useFavorite from "../../hooks/useFavorite";
import { addFavorite } from "../../services/favorites";

const MediaBox = ({ id, title, artist, favorite, image, refreshPage }) => {
  const { playVideo } = usePlay();
  const { toggleFavorite } = useFavorite();

  const handleRefresh = (response) => {
    if (response.refresh) {
      refreshPage();
    }
  };

  return (
    <MediaBoxContainer>
      <MediaBoxImage>
        <DynamicImage image={image} width={280} height={280} />
      </MediaBoxImage>
      <MediaBoxTitle>
        <Text
          label={title}
          height="25px"
          lineHeight="25px"
          fontSize="1rem"
          color="textPrimary"
        />
      </MediaBoxTitle>
      <MediaBoxSubTitle>
        <Text
          label={artist}
          height="20px"
          lineHeight="20px"
          fontSize="0.8rem"
          color="textSecondary"
        />
      </MediaBoxSubTitle>
      <MediaBoxFooter>
        <Button
          size="sm"
          label="Play"
          type="outlined"
          onClick={() => playVideo(id)}
        />
        <Button
          size="xs"
          icon={favorite ? "AiFillHeart" : "AiOutlineHeart"}
          iconColor={favorite ? "activePrimary" : "textPrimary"}
          onClick={async () => handleRefresh(await addFavorite(id))}
        />
      </MediaBoxFooter>
    </MediaBoxContainer>
  );
};

export default MediaBox;
