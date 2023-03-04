import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";

const Layout = ({ children }) => {

  return (
    <Container style={{ paddingTop: '16px' }}>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
