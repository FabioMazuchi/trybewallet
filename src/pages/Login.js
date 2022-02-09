import React from 'react';
import { connect } from 'react-redux';
import { logar } from '../actions';

const MAX_VALUE = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      visible: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.logar = this.logar.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateEmail(),
    );
  }

  validateEmail() {
    const { email, senha } = this.state;
    const valid = /\S+@\S+\.\S+/;
    const res = valid.test(email);
    if (res && senha.length >= MAX_VALUE) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  }

  logar() {
    const { email } = this.state;
    const { logar, history } = this.props;
    logar(email);
    history.push('/carteira');
    this.setState({ visible: true });
  }

  render() {
    const { visible } = this.state;
    return (
      <form>
        <input
          onChange={ this.handleChange }
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Email..."
        />
        <input
          onChange={ this.handleChange }
          data-testid="password-input"
          type="password"
          name="senha"
          placeholder="Senha..."
        />
        <button onClick={ this.logar } disabled={ visible } type="reset">Entrar</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispacth) => ({
  logar: (email) => dispacth(logar(email)),
});

export default connect(null, mapDispatchToProps)(Login);
