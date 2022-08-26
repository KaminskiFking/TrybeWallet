import React, { Component } from 'react';
import { connect } from 'react-redux';
import addAssignment from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  isValidEmail = (email) => {
    const valid = email.match(/^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/);

    return valid != null;
  };

  isValidPassword = (password) => {
    const minimumCharacter = 6;
    return password.length >= minimumCharacter;
  };

  validSubmit = () => {
    const { password, email } = this.state;
    return this.isValidEmail(email) && this.isValidPassword(password);
  };

  render() {
    const { email, password } = this.state;
    const { history, add } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              data-testid="email-input"
              name="email"
              onChange={ this.onInputChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              id="password"
              name="password"
              value={ password }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            onClick={ () => add(email) && history.push('/carteira') }
            disabled={ !this.validSubmit() }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  add: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add: (value) => dispatch(addAssignment(value)),
});

export default connect(null, mapDispatchToProps)(Login);
