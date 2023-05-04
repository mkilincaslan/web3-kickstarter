import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import { factoryInstance } from "../../ethereum/contracts";

const NewCampaign = () => {
  const [contribution, setContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      await factoryInstance.methods
        .createCampaign(contribution)
        .send({ from: accounts[0] });

      setLoading(false);
      router.push("/");
    } catch (err) {
      setLoading(false);
      console.error(err.message);
      setErrorMessage(err.message);
    }
  };
  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution (Wei)</label>
          <Input
            label="Wei"
            labelPosition="right"
            placeholder="Minimum Contribution"
            value={contribution}
            onChange={(event) => setContribution(event.target.value)}
            error={!!errorMessage}
          />
          <Message error header={errorMessage} />
        </Form.Field>
        <Button primary type="submit" loading={loading}>
          Create Campaign
        </Button>
      </Form>
    </Layout>
  );
};

export default NewCampaign;
