import React from "react";
import Layout from "../../components/Layout";
import { getCampaignByAddress } from "../../ethereum/contracts";

const translateContractDetail = (detail) => {
  return {
    minimumContribution: detail[0],
    balance: detail[1],
    requestsCount: detail[2],
    approversCount: detail[3],
    manager: detail[4],
  };
};

const CampaignDetails = ({ contractDetail }) => {
  return (
    <Layout>
      <h3>Campaign Details</h3>
    </Layout>
  );
};

CampaignDetails.getInitialProps = async ({ query }) => {
  const { address } = query;
  const campaign = getCampaignByAddress(address);
  const contractDetail = await campaign.methods.getSummary().call();
  return { contractDetail: translateContractDetail(contractDetail) };
};

export default CampaignDetails;
