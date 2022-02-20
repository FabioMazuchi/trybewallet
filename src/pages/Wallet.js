import React from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import FormEdit from '../components/FormEdit';
import FormWallet from '../components/FormWallet';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { editando } = this.props;
    return (
      <>
        <Header />
        {editando ? <FormEdit /> : <FormWallet />}
        <Table />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editando: state.wallet.isEditing,
});

export default connect(mapStateToProps)(Wallet);
