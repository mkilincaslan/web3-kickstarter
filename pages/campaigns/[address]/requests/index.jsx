import React from "react";
import Link from "next/link";
import { Button, Grid, Table } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import { getCampaignByAddress } from "../../../../ethereum/contracts";

const Requests = ({ address, requests }) => {
  return (
    <Layout>
      <Grid>
        <Grid.Row>
          <Grid.Column width={13}>
            <h2>Requests</h2>
          </Grid.Column>
          <Grid.Column width={3}>
            <Link href={`/campaigns/${address}/requests/new`}>
              <Button primary floated="right" content="Add Request" />
            </Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Recipient</Table.HeaderCell>
                <Table.HeaderCell>Approval Count</Table.HeaderCell>
                <Table.HeaderCell>Approve</Table.HeaderCell>
                <Table.HeaderCell>Finalize</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

          </Table>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

Requests.getInitialProps = async ({ query }) => {
  const { address } = query;
  const campaign = getCampaignByAddress(address);
  const requestsCount = await campaign.methods.getRequestsCount().call();

  const requests = await Promise.all(
    Array(requestsCount).fill().map((_, index) => {
      return campaign.methods.requests(index).call()
    }),
  );

  return { address, requests, requestsCount };
};

export default Requests;
