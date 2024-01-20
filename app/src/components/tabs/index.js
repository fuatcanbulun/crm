import React from "react";
import {
  TabsContainer,
  TabsButtonsLayer,
  TabsAnimationLayer,
  TabsAnimationSelection,
} from "./style";
import TabButton from "../tabButton";

const Tabs = ({ data, activeTab, setActiveTab }) => {
  return (
    <TabsContainer>
      <TabsButtonsLayer>
        {data.map((item, index) => (
          <TabButton
            key={index}
            id={item.id}
            label={item.name}
            //image={item.image}
            isActive={activeTab === item.id}
            onClick={() => setActiveTab(item.id)}
          />
        ))}
      </TabsButtonsLayer>
      <TabsAnimationLayer>
        <TabsAnimationSelection
          left={data.findIndex((item) => item.id === activeTab) * 150}
        />
      </TabsAnimationLayer>
    </TabsContainer>
  );
};

export default Tabs;
