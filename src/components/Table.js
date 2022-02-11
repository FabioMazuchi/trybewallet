import React, { Component } from "react";
import { connect } from "react-redux";
// import Rows from "./Rows";

class Table extends Component {
  render() {
    const { despesas, isLoading } = this.props;
    if (isLoading) return 'Loading';
    return (
      <div>
        {despesas !== undefined && (
          <table>
            <tr>
              <td>Descrição</td>
              <td>Tag</td>
              <td>Método de pagamento</td>
              <td>Valor</td>
              <td>Moeda</td>
              <td>Câmbio utilizado</td>
              <td>Valor convertido</td>
              <td>Moeda de conversão</td>
              <td>Editar/Excluir</td>
            </tr>
            {despesas.map((despesa) => (
              <tr key={despesa.id}>
                <td>{despesa.description}</td>
                <td>{despesa.tag}</td>
                <td>{despesa.currency}</td>
                <td>{despesa.value}</td>
                <td>{despesa.exchangeRates[despesa.moeda].name}</td>
                <td>{despesa.exchangeRates[despesa.moeda].ask}</td>
                <td>
                  {(
                    despesa.exchangeRates[despesa.moeda].ask * despesa.value
                  ).toFixed(2)}
                </td>
                <td>{despesa.exchangeRates[despesa.moeda].name}</td>
              </tr>
            ))}
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  despesas: state.wallet.expenses,
  isLoading: state.wallet.isFetching,
});

// Table.propTypes = {
//   despesas: PropTypes.arrayOf.isRequired,
// };

export default connect(mapStateToProps)(Table);
