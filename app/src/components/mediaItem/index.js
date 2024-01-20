import React from "react";
import {
  MediaItemContainer,
  MediaItemImage,
  MediaItemTitle,
  MediaItemSubTitle,
  MediaItemButtons,
  MediaItemCounts,
} from "./style";
import Text from "../text";
import Icon from "../icon";
import DynamicImage from "../dynamicImage";
import Button from "../button";
import usePlay from "../../hooks/usePlay";

const MediaItem = ({ id, title, artist, likes, image }) => {
  const { playVideo } = usePlay();

  return (
    <MediaItemContainer>
      <MediaItemImage>
        <DynamicImage image={image} width={50} height={50} />
      </MediaItemImage>
      <MediaItemTitle>
        <Text
          label={title}
          height="30px"
          lineHeight="30px"
          fontSize="1rem"
          color="textPrimary"
        />
      </MediaItemTitle>
      <MediaItemSubTitle>
        <Text
          label={artist}
          height="20px"
          lineHeight="20px"
          fontSize="0.8rem"
          color="textSecondary"
        />
      </MediaItemSubTitle>
      <MediaItemCounts>
        <Text label={likes} size="md" color="textPrimary" />
        <Icon data="FiUser" size="sm" color="textSecondary" />
      </MediaItemCounts>
      <MediaItemButtons>
        <Button
          size="xs"
          icon="FiPlay"
          iconColor="textPrimary"
          onClick={() => playVideo(id)}
        />
      </MediaItemButtons>
    </MediaItemContainer>
  );
};

export default MediaItem;
