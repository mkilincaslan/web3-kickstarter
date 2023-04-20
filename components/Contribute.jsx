import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { getCampaignByAddress } from "../ethereum/contracts";
import web3 from "../ethereum/web3";

const Contribute = ({ address }) => {
  const [contribution, setContribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      const campaignContract = getCampaignByAddress(address);
      await campaignContract.methods
        .contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(contribution, "ether"),
        });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <h4>Contribute to this campaign!</h4>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Amount to Contribute (Eth)</label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder="Amount to Contribution"
            value={contribution}
            onChange={(event) => setContribution(event.target.value)}
            error={!!errorMessage}
          />
          <Message error header={errorMessage} />
        </Form.Field>
        <Button primary type="submit" loading={loading}>
          Contribute!
        </Button>
      </Form>
    </div>
  );
};

export default Contribute;
