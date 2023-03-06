import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const NewCampaign = () => {
  const [contribution, setContribution] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(contribution)
        .send({ from: accounts[0] });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Minimum Contribution (Wei)</label>
          <Input
            label="Wei"
            labelPosition="right"
            placeholder="Minimum Contribution"
            value={contribution}
            onChange={(event) => setContribution(event.target.value)}
          />
        </Form.Field>
        <Button primary type="submit">
          Create Campaign
        </Button>
      </Form>
    </Layout>
  );
};

export default NewCampaign;
