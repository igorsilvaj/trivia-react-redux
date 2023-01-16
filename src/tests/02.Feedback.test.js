import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from "../App";
import { act } from "react-dom/test-utils";
import Feedback from "../pages/Feedback";
import {playerStateC, playerStateE} from "./mocks/reduxState";
import userEvent from "@testing-library/user-event";

describe('Testes do componente de Feedback', () => {
  it('Testa se acessou a rota da página de Feedback', async () => {
    const { history } = renderWithRouterAndRedux(<Feedback />, playerStateC, '/feedback');
    expect(history.location.pathname).toBe('/feedback')
  });

  it('Testa se a mensagem "Well Done!" aparece', () => {
    renderWithRouterAndRedux(<Feedback />, playerStateC, '/feedback');
    const feedbackMsg = screen.getByText(/Well Done!/i)
    expect(feedbackMsg).toBeInTheDocument();
  });

  it('Testa se a mensagem "Could be better..." aparece', () => {
    renderWithRouterAndRedux(<Feedback />, playerStateE, '/feedback');
    const feedbackMsg = screen.getByText(/could be better\.\.\./i)
    expect(feedbackMsg).toBeInTheDocument();
  })

  it('Testa se a mensagem "Could be better..." aparece', () => {
    renderWithRouterAndRedux(<Feedback />, playerStateE, '/feedback');
    const feedbackMsg = screen.getByText(/could be better\.\.\./i)
    expect(feedbackMsg).toBeInTheDocument();
  })

  it('Testa se ao clicar no botão play again a roda é alterada para "/"', async () => {
    const { history } = renderWithRouterAndRedux(<App />, playerStateC, '/feedback');
    const btnPlayAgain = screen.getByRole('button', {  name: /play again/i});
    expect(btnPlayAgain).toBeInTheDocument();
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/')
  })

  it('Testa se ao clicar no ranking again a roda é alterada para "/ranking"', async () => {
    const { history } = renderWithRouterAndRedux(<App />, playerStateC, '/feedback');
    const btnRanking = screen.getByRole('button', {  name: /ranking/i});
    expect(btnRanking).toBeInTheDocument();
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking')
  })
});
