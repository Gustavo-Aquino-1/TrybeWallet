import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes do projeto trybeWallet', () => {
  it('Quando a aplicação inicia a página de login é renderizada.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText('Email');
    const inputSenha = screen.getByPlaceholderText('Password');
    const button = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    userEvent.type(inputEmail, 'email@test.com');
    userEvent.type(inputSenha, '12345678');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Testando a página wallet', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputText = screen.getByRole('textbox');
    const selects = screen.getAllByRole('combobox');
    const btn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const brlText = screen.getByText(/brl/i);
    const inputValue = screen.getByPlaceholderText(/value/i);

    expect(inputValue).toBeInTheDocument();
    expect(brlText).toBeInTheDocument();
    expect(inputText).toBeInTheDocument();
    expect(selects.length).toBe(3);
    expect(btn).toBeInTheDocument();

    userEvent.type(inputValue, '1');
    userEvent.click(btn);

    const valueAtt = await screen.findByText('5.40');

    expect(valueAtt).toBeInTheDocument();
  });
});
