import { CURRENCY_API, SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_API: {
    const currenciesResult = Object.keys(action.payload);
    const currenciesFull = Object(action.payload);
    return { ...state,
      currencies: currenciesResult.filter((currency) => currency !== 'USDT'),
      exchangeRates: currenciesFull,
    };
  }
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses,
        { id: state.expenses.length,
          ...action.payload,
          exchangeRates: state.exchangeRates }],
    };

  default:
    return state;
  }
};

export default wallet;
