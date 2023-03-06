import React from "react";
import { Card, Button } from "semantic-ui-react";
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
      <Button
        content="Create Campaign"
        floated="right"
        icon="add circle"
        primary
        labelPosition="right"
      />
      <CardExampleGroupProps items={contracts} />
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const contracts = await factory.methods.getDeployedCampaigns().call();

  return { contracts };
};

export default Index;
