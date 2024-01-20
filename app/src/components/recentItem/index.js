import React from "react";
import { RecentItemContainer, RecentItemImage, RecentItemText } from "./style";
import Image from "../image";
import Text from "../text";
import usePlay from "../../hooks/usePlay";
import DynamicImage from "../dynamicImage";

const RecentItem = ({ id, title, image }) => {
  const { playVideo } = usePlay();

  return (
    <RecentItemContainer onClick={() => playVideo(id)}>
      <RecentItemImage>
        <DynamicImage image={image} width={30} height={30} />
      </RecentItemImage>
      <RecentItemText>
        <Text label={title} color="textWhite" size="sm" />
      </RecentItemText>
    </RecentItemContainer>
  );
};

export default RecentItem;
