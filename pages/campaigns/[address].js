import React from "react";
import { Card, Grid } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Layout from "../../components/Layout";
import ContributeForm from "../../components/Contribute";
import { getCampaignByAddress } from "../../ethereum/contracts";

const translateContractDetail = (detail) => {
  const contractObject = {
    minimumContribution: detail[0],
    balance: detail[1],
    requestsCount: detail[2],
    approversCount: detail[3],
    manager: detail[4],
  };

  return [
    {
      header: "Minimum Contribution",
      meta: `${web3.utils.fromWei(
        contractObject.minimumContribution,
        "ether"
      )} eth`,
      description:
        "The minimum amount for the contribution of this particular campaign",
    },
    {
      header: "Balance",
      meta: `${web3.utils.fromWei(contractObject.balance, "ether")} eth`,
      description:
        "The current balance is how much money of this campaign has left to spend",
    },
    {
      header: "Requests Count",
      meta: contractObject.requestsCount,
      description:
        "The requests counts of this campaign created by manager to withdraw the money for some costs",
    },
    {
      header: "Approvers Count",
      meta: contractObject.approversCount,
      description:
        "The approvers counts of this campaign who contributed/donated to this campaign",
    },
    {
      header: "Manager",
      meta: contractObject.manager,
      description:
        "The manager of this campaign who created and manages this campaign",
      style: { overflowWrap: "break-word" },
    },
  ];
};

const CampaignDetails = ({ contractDetail, address }) => {
  return (
    <Layout>
      <h3>Campaign Details</h3>
      <Grid>
        <Grid.Column width={10}>
          <Card.Group items={contractDetail} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

CampaignDetails.getInitialProps = async ({ query }) => {
  const { address } = query;
  const campaign = getCampaignByAddress(address);
  const contractDetail = await campaign.methods.getSummary().call();
  return { contractDetail: translateContractDetail(contractDetail), address };
};

export default CampaignDetails;
