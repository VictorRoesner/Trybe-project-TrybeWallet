export const SAVE_LOGIN_INPUT = 'SAVE_LOGIN_INPUT';

export const saveLoginInput = (payload) => ({
  type: SAVE_LOGIN_INPUT,
  payload,
});

export const CURRENCY_API = 'CURRENCY_API';

export const currencyApi = (payload) => ({
  type: CURRENCY_API,
  payload,
});

export function currencyApiThunk() {
  return async (dispatch) => {
    try {
      const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await resolve.json();
      dispatch(currencyApi(result));
    } catch (error) {
      console.error(error.message);
    }
  };
}

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveExpenses = (payload) => ({
  type: SAVE_EXPENSES,
  payload,
});
