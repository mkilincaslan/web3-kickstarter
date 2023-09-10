import React from "react";
import Link from "next/link";
import { Button, Grid, Table } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import { getCampaignByAddress } from "../../../../ethereum/contracts";
import web3 from "../../../../ethereum/web3";

const Requests = ({ address, requests, approversCount }) => {
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

            <Table.Body>
              {requests.length && requests.map((request, index) => (
                <Table.Row>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{request.description}</Table.Cell>
                  <Table.Cell>{web3.utils.fromWei(request.value, 'ether')} eth</Table.Cell>
                  <Table.Cell>{request.recipient}</Table.Cell>
                  <Table.Cell>{request.approvalCount}/{approversCount}</Table.Cell>
                  <Table.Cell positive>Approve</Table.Cell>
                  <Table.Cell negative>Finalize</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
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
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(requestsCount).fill().map((_, index) => {
      return campaign.methods.requests(index).call()
    }),
  );

  return { address, requests, requestsCount, approversCount };
};

export default Requests;
