import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

export default function Header() {
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <Menu>
      <Menu.Item
        name="crowdcoin"
        active={activeItem === "crowdcoin"}
        onClick={handleItemClick}
      >
        <Link href="/">CrowdCoin</Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="campaigns"
          active={activeItem === "campaigns"}
          onClick={handleItemClick}
        >
          <Link href="/campaigns">Campaigns</Link>
        </Menu.Item>

        <Menu.Item
          name="help"
          active={activeItem === "help"}
          onClick={handleItemClick}
        >
          <Link href="/campaigns/new">+</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
