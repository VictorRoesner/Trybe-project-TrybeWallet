import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.SumExpenses = this.SumExpenses.bind(this);
  }

  SumExpenses() {
    const { expenses } = this.props;
    console.log(expenses);
    const sum = expenses.reduce((acc, { value, currency, exchangeRates }) => (
      acc + value * (exchangeRates[currency].ask)
    ), 0);
    return sum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{ this.SumExpenses()}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
export default connect(mapStateToProps)(Header);
