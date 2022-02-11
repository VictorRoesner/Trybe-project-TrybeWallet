import { CURRENCY_API } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_API: {
    const currenciesResult = Object.keys(action.payload);
    return { ...state,
      currencies: currenciesResult.filter((currency) => currency !== 'USDT'),
    };
  }

  default:
    return state;
  }
};

export default wallet;
