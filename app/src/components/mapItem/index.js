import React from "react";
import {
  MapItemContainer,
  MapItemImage,
  MapItemBody,
  MapItemAnimation,
} from "./style";
import Text from "../text";
import Image from "../image";
import DynamicImage from "../dynamicImage";

const MapItem = ({ id, title, user, image }) => {
  return (
    <MapItemContainer id={`marker${id}`} onClick={() => alert(id)}>
      <MapItemImage>
        <DynamicImage image={image} width={60} height={60} />
      </MapItemImage>
      <MapItemBody>
        <Text
          label={user}
          height="20px"
          lineHeight="20px"
          fontSize="0.8rem"
          color="textPrimary"
        />
        <Text
          label={title}
          height="20px"
          lineHeight="20px"
          fontSize="0.8rem"
          color="textSecondary"
        />
      </MapItemBody>
      <MapItemAnimation>
        <Image imageName="playing" type="gif" size="cover" />
      </MapItemAnimation>
    </MapItemContainer>
  );
};

export default MapItem;
