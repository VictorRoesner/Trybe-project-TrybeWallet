import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currencyApiThunk, saveExpenses } from '../actions';

class Expenses extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: {
        value: 0,
        description: '',
        currency: 'BRL',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange = ({ target: { name, value } }) => {
    const { expenses } = this.state;
    this.setState(() => ({
      expenses: {
        ...expenses,
        [name]: value,
      },
    }));
  };

  handleClick = async () => {
    const { catchExpenses, fetchCurrency } = this.props;
    const { expenses } = this.state;
    fetchCurrency();
    catchExpenses(expenses);
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        value: 0,
      },
    }));
  }

  render() {
    const { money } = this.props;
    const { expenses: { value } } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            value={ value }
            data-testid="value-input"
            id="value"
            name="value"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
          >
            {!money ? '' : money.map((currency) => (
              <option key={ currency }>{currency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            data-testid="method-input"
            id="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            name="tag"
            data-testid="tag-input"
            id="tag"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ this.handleClick }>
          Adicionar despesa
        </button>

      </form>
    );
  }
}

Expenses.propTypes = {
  money: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  catchExpenses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  money: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(currencyApiThunk()),
  catchExpenses: (expenses) => dispatch(saveExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
