// Coloque aqui suas actions

// Actions Types

export const GET_EMAIL = 'GET_EMAIl';
export const GET_COINS = 'GET_COINS';

export const actionGetEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

const actionGetCoins = (coins) => ({
  type: GET_COINS,
  payload: Object.keys(coins).filter((e) => e !== 'USDT'),
});

export function fetchApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(actionGetCoins(data));
  };
}
