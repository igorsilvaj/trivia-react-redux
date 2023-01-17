import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { correctRanking } from "./mocks/localStorage";
import App from "../App";

describe('Testes do componente de Ranking', () => {
  it('Deve ter um botão que ao clicado redireciona a tela de Login', async () => {
    localStorage.setItem('ranking', JSON.stringify(correctRanking));
    const {history} = renderWithRouterAndRedux(<App />, {}, '/ranking');
    expect(history.location.pathname).toBe('/ranking')
    const btnPlayAgain = screen.getByRole('button', {  name: /jogar novamente/i});
    expect(btnPlayAgain).toBeVisible();
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/')
  })
})