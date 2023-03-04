import React from "react";
import { Card, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";

const CardExampleGroupProps = ({ items }) => <Card.Group items={items} />;

const Index = ({ contracts }) => {
  contracts = contracts.map((address) => ({
    header: address,
    fluid: true,
    description: <a>View Campaign</a>,
  }));

  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <CardExampleGroupProps items={contracts} />
      <Button
        content="Create Campaign"
        icon="add circle"
        primary
        labelPosition="right"
      />
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const contracts = await factory.methods.getDeployedCampaigns().call();

  return { contracts };
};

export default Index;
