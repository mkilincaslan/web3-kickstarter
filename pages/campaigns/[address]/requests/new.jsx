import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Form, Grid, Input, Message } from "semantic-ui-react";
import web3 from "../../../../ethereum/web3";
import { getCampaignByAddress } from "../../../../ethereum/contracts";
import Layout from "../../../../components/Layout";

const NewRequest = ({address}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = await getCampaignByAddress(address);

      const {description, value, recipient} = formValues;

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      setLoading(false);
      router.push(`/campaigns/${address}/requests`);
    } catch (err) {
      setLoading(false);
      console.error(err.message);
      setErrorMessage(err.message);
    }
  };

  return (
    <Layout>
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Link href={`/campaigns/${address}/requests`}>
              <Button content="< Back" />
            </Link>
            <h3>Create a Request</h3>

            <Form onSubmit={onSubmit} error={!!errorMessage}>
              <Form.Field>
                <label>Description of The Request</label>
                <Input
                  placeholder="Description"
                  value={formValues['description']}
                  onChange={(event) => setFormValues(previous => ({...previous, description: event.target.value}))}
                  error={!!errorMessage}
                />
              </Form.Field>
              <Form.Field>
                <label>Recipient Address</label>
                <Input
                  placeholder="Address"
                  value={formValues['recipient']}
                  onChange={(event) => setFormValues(previous => ({...previous, recipient: event.target.value}))}
                  error={!!errorMessage}
                />
              </Form.Field>
              <Form.Field>
                <label>Value of The Request to Spend (Eth)</label>
                <Input
                  label="Eth"
                  labelPosition="right"
                  placeholder="Value"
                  value={formValues['value']}
                  onChange={(event) => setFormValues(previous => ({...previous, value: event.target.value}))}
                  error={!!errorMessage}
                />
              </Form.Field>

              <Message error header={errorMessage} />
              <Button primary type="submit" loading={loading}>
                Create Request
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

NewRequest.getInitialProps = async ({ query }) => {
  const { address } = query;
  return { address };
};

export default NewRequest;
