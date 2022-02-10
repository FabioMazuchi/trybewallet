import React from "react";
import FormWallet from "../components/FormWallet";
import Header from "../components/Header";

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormWallet />
      </>
    );
  }
}

export default Wallet;
