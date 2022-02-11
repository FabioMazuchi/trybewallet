import React from 'react';
import FormWallet from '../components/FormWallet';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FormWallet />
        {/* <Table /> */}
      </>
    );
  }
}

export default Wallet;
