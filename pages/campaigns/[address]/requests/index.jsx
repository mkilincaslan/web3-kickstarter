import React from "react";
import Link from "next/link";
import { Button, Grid } from "semantic-ui-react";
import Layout from "../../../../components/Layout";

const Requests = ({ address }) => {
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
        <Grid.Row>{/* Table will be here filled by requests data */}</Grid.Row>
      </Grid>
    </Layout>
  );
};

Requests.getInitialProps = async ({ query }) => {
  return { address: query.address };
};

export default Requests;
