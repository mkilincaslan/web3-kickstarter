import React from "react";
import Link from "next/link";
import { Button, Grid, Table } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import { getCampaignByAddress } from "../../../../ethereum/contracts";
import web3 from "../../../../ethereum/web3";

const TableHeader = () => (
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
);

const TableRow = ({ request, approversCount, id, onApproveClick, onFinalizeClick }) => (
  <Table.Row>
    <Table.Cell>{id}</Table.Cell>
    <Table.Cell>{request.description}</Table.Cell>
    <Table.Cell>{web3.utils.fromWei(request.value, "ether")} eth</Table.Cell>
    <Table.Cell>{request.recipient}</Table.Cell>
    <Table.Cell>
      {request.approvalCount}/{approversCount}
    </Table.Cell>
    <Table.Cell positive>
      <Button basic onClick={onApproveClick}>Approve</Button>
    </Table.Cell>
    <Table.Cell negative>
      <Button basic onClick={onFinalizeClick}>Finalize</Button>
    </Table.Cell>
  </Table.Row>
);

const Requests = ({ address, requests, approversCount }) => {

  const onApproveClick = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const campaign = getCampaignByAddress(address);

    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  };
  const onFinalizeClick = async (id) => {
    const accounts = await web3.eth.getAccounts();
    const campaign = getCampaignByAddress(address);

    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    });
  };

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
            <TableHeader />
            <Table.Body>
              {requests.length &&
                requests.map((request, index) => (
                  <TableRow
                    request={request}
                    approversCount={approversCount}
                    onApproveClick={() => onApproveClick(index)}
                    onFinalizeClick={() => onFinalizeClick(index)}
                    id={index}
                  />
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
    Array(requestsCount)
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return { address, requests, requestsCount, approversCount };
};

export default Requests;
