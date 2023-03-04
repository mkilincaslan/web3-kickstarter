import React, { useState } from "react";
import { Menu } from "semantic-ui-react";

export default function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu>
      <Menu.Item
        name="crowdcoin"
        active={activeItem === "crowdcoin"}
        onClick={handleItemClick}
      >
        CrowdCoin
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="campaigns"
          active={activeItem === "campaigns"}
          onClick={handleItemClick}
        >
          Campaigns
        </Menu.Item>

        <Menu.Item
          name="help"
          active={activeItem === "help"}
          onClick={handleItemClick}
        >
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
