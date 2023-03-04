import React from "react";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import factory from "../ethereum/factory";

const CardExampleGroupProps = ({ items }) => <Card.Group items={items} />;

const Index = ({ contracts }) => {
  contracts = contracts.map((address) => ({
    header: address,
    fluid: true,
    description: <a>View Campaign</a>,
  }));

  return (
    <div>
      <CardExampleGroupProps items={contracts} />
      <Button content="Create Campaign" icon="add circle" primary labelPosition="right" />
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  const contracts = await factory.methods.getDeployedCampaigns().call();

  return { contracts };
};

export default Index;
