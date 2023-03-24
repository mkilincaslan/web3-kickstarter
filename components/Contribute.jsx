import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

const Contribute = () => {
  const [contribution, setContribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = () => {};

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
