import React from "react";

import { Menu } from "./Menu";

export default {
  title: "SortCollectionValueItem",
  component: Menu,
};

const Template = (args) => <Menu {...args} />;

export const isToggled = Template.bind({});
isToggled.args = {
  isToggled: true,
};
